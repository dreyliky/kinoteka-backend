import { MediaDownloadQueue } from '@classes/core';
import { ShortFilm } from '@interfaces/film';
import { Injectable } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class FilmsDownloadingQueueState {
    public get onQueueUpdated$(): Observable<boolean> {
        return this._onQueueUpdated$.asObservable();
    }

    public get onFilmAdded$(): Observable<MediaDownloadQueue<ShortFilm>> {
        return this._onFilmAdded$.asObservable();
    }

    public get onFilmRemoved$(): Observable<MediaDownloadQueue<ShortFilm>> {
        return this._onFilmRemoved$.asObservable();
    }

    private readonly _data = new Map<string, MediaDownloadQueue<ShortFilm>>();
    private readonly queue: string[] = [];

    private readonly _onFilmAdded$ = new Subject<MediaDownloadQueue<ShortFilm>>();
    private readonly _onFilmRemoved$ = new Subject<MediaDownloadQueue<ShortFilm>>();
    private readonly _onQueueUpdated$ = new Subject<boolean>();

    public getFirst(): MediaDownloadQueue<ShortFilm> | null {
        if (this.queue[0]) {
            return this._data.get(this.queue[0]);
        }

        return null;
    }

    public getAll(): MediaDownloadQueue<ShortFilm>[] {
        return [...this._data.values()];
    }

    public add(film: ShortFilm, translationId: number): void {
        const filmQueue = new MediaDownloadQueue(film, translationId);

        this.queue.push(film.kinopoiskId);
        this._data.set(film.kinopoiskId, filmQueue);
        this._onFilmAdded$.next(filmQueue);
        this._onQueueUpdated$.next(true);
    }

    public addAsFirst(film: ShortFilm, translationId: number): void {
        const filmQueue = new MediaDownloadQueue(film, translationId);

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
