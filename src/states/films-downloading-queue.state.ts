import { ShortFilmQueue } from '@classes';
import { ShortFilm } from '@interfaces';
import { Injectable } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class FilmsDownloadingQueueState {
    public get onQueueUpdated$(): Observable<boolean> {
        return this._onQueueUpdated$.asObservable();
    }

    public get onFilmAdded$(): Observable<ShortFilmQueue> {
        return this._onFilmAdded$.asObservable();
    }

    public get onFilmRemoved$(): Observable<ShortFilmQueue> {
        return this._onFilmRemoved$.asObservable();
    }

    private readonly _data = new Map<string, ShortFilmQueue>();
    private readonly queue: string[] = [];

    private readonly _onFilmAdded$ = new Subject<ShortFilmQueue>();
    private readonly _onFilmRemoved$ = new Subject<ShortFilmQueue>();
    private readonly _onQueueUpdated$ = new Subject<boolean>();

    public getFirst(): ShortFilmQueue | null {
        if (this.queue[0]) {
            return this._data.get(this.queue[0]);
        }

        return null;
    }

    public getAll(): ShortFilmQueue[] {
        return [...this._data.values()];
    }

    public add(film: ShortFilm): void {
        const filmQueue = new ShortFilmQueue(film);

        this.queue.push(film.kinopoiskId);
        this._data.set(film.kinopoiskId, filmQueue);
        this._onFilmAdded$.next(filmQueue);
        this._onQueueUpdated$.next(true);
    }

    public addAsFirst(film: ShortFilm): void {
        const filmQueue = new ShortFilmQueue(film);

        this.queue.unshift(film.kinopoiskId);
        this._data.set(film.kinopoiskId, filmQueue);
        this._onFilmAdded$.next(filmQueue);
        this._onQueueUpdated$.next(true);
    }

    public has(kinopoiskId: string): boolean {
        return this._data.has(kinopoiskId);
    }

    public markAsDownloading(kinopoiskId: string): void {
        const filmQueue = this._data.get(kinopoiskId);
        filmQueue.isDownloading = true;

        this._data.set(kinopoiskId, filmQueue);
    }

    public remove(kinopoiskId: string): void {
        const filmQueue = this._data.get(kinopoiskId);
        const filmIdQueueIndex = this.queue.indexOf(kinopoiskId);

        filmQueue.onDestroy();
        this.queue.splice(filmIdQueueIndex, 1);
        this._data.delete(kinopoiskId);
        this._onFilmRemoved$.next(filmQueue);
        this._onQueueUpdated$.next(true);
    }

    public updateProgress(kinopoiskId: string, progress: number): void {
        const filmQueue = this._data.get(kinopoiskId);
        filmQueue.downloadProgress$.next(progress);
    }
}
