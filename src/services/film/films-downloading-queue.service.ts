import { MediaDownloadQueue } from '@classes/core';
import { ShortFilm } from '@interfaces/film';
import { Injectable } from '@nestjs/common';
import { FilmsDownloadingQueueState } from '@states/film';
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

    public getAll(): MediaDownloadQueue<ShortFilm>[] {
        return this.queueState.getAll();
    }

    public add(film: ShortFilm, translationId: number): void {
        this.queueState.add(film, translationId);
    }

    public remove(kinopoiskId: string): void {
        this.queueState.remove(kinopoiskId);
    }

    private startDownloadFirstFilmIfReady(): void {
        const firstFilm = this.queueState.getFirst();

        if (firstFilm && !firstFilm.isDownloading) {
            this.queueState.markAsDownloading(firstFilm.data.kinopoiskId);

            const downloadSubscription = this.downloader.download(firstFilm.data, firstFilm.translationId)
                .pipe(catchError((error) => {
                    this.remove(firstFilm.data.kinopoiskId);

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
