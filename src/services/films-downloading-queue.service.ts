import { ShortFilmQueue } from '@classes';
import { ShortFilm } from '@interfaces';
import { Injectable } from '@nestjs/common';
import { FilmsDownloadingQueueState } from '@states';
import { catchError, throwError } from 'rxjs';
import { FilmDownloaderService } from './film-downloader.service';

@Injectable()
export class FilmsDownloadingQueueService {
    constructor(
        private readonly downloader: FilmDownloaderService,
        private readonly queueState: FilmsDownloadingQueueState,
    ) {
        this.initQueueUpdatesObserver();
    }

    public getAll(): ShortFilmQueue[] {
        return this.queueState.getAll();
    }

    public add(film: ShortFilm): void {
        this.queueState.add(film);
    }

    public remove(kinopoiskId: string): void {
        this.queueState.remove(kinopoiskId);
    }

    private startDownloadFirstFilmIfReady(): void {
        const firstFilm = this.queueState.getFirst();

        if (firstFilm && !firstFilm.isDownloading) {
            this.queueState.markAsDownloading(firstFilm.data.kinopoiskId);

            const downloadSubscription = this.downloader.download(firstFilm.data)
                .pipe(catchError((error) => {
                    this.remove(firstFilm.data.kinopoiskId);
                    this.queueState.addAsFirst(firstFilm.data);

                    return throwError(() => new Error(error));
                }))
                .subscribe({
                    next: (progress) => this.queueState.updateProgress(firstFilm.data.kinopoiskId, progress),
                    complete: () => this.queueState.remove(firstFilm.data.kinopoiskId)
                });

            firstFilm.cancelDownload$
                .subscribe(() => {
                    downloadSubscription.unsubscribe();
                    this.downloader.delete(firstFilm.data.kinopoiskId);
                });
        }
    }

    private initQueueUpdatesObserver(): void {
        this.queueState.onQueueUpdated$
            .subscribe(() => this.startDownloadFirstFilmIfReady());
    }
}
