import { MediaDownloadQueue } from '@classes/media';
import { MediaTypeEnum } from '@enums/media';
import { MediaDownloaderFactory } from '@factories/media';
import { Injectable } from '@nestjs/common';
import { MediaDownloadingQueueState } from '@states/media';
import { catchError, throwError } from 'rxjs';

@Injectable()
export class MediaDownloadingQueueService {
    constructor(
        private readonly mediaDownloaderFactory: MediaDownloaderFactory,
        private readonly queueState: MediaDownloadingQueueState,
    ) {
        this.initQueueUpdatesObserver();
    }

    public getAll(): MediaDownloadQueue[] {
        return this.queueState.getAll();
    }

    public getBySelector<T>(mediaSelector: (media: T) => boolean): MediaDownloadQueue {
        return this.queueState.getBySelector(mediaSelector);
    }

    public add(type: MediaTypeEnum, media: unknown, downloadOptions: unknown): void {
        this.queueState.add(type, media, downloadOptions);
    }

    public remove(id: string): void {
        this.queueState.remove(id);
    }

    private startDownloadFirstMediaIfReady(): void {
        const firstMedia = this.queueState.getFirst();

        if (firstMedia && !firstMedia.isDownloading) {
            this.queueState.markAsDownloading(firstMedia.data);

            const downloader = this.mediaDownloaderFactory.get(firstMedia.type);
            const downloadSubscription = downloader.download(firstMedia.data, firstMedia.options)
                .pipe(catchError((error) => {
                    this.queueState.remove(firstMedia.id);

                    return throwError(() => new Error(error));
                }))
                .subscribe({
                    next: (progress) => this.queueState.updateProgress(firstMedia.data, progress),
                    complete: () => this.queueState.remove(firstMedia.id)
                });

            firstMedia.cancelDownload$
                .subscribe(() => {
                    downloadSubscription.unsubscribe();
                    downloader.delete(firstMedia.data);
                });
        }
    }

    private initQueueUpdatesObserver(): void {
        this.queueState.onQueueUpdated$
            .subscribe(() => this.startDownloadFirstMediaIfReady());
    }
}
