import { adaptMediaDownloadQueueToDto } from '@adapters/media';
import { MediaDownloadQueue } from '@classes/media';
import { SocketEventEnum } from '@enums/core';
import { MediaProgressDto } from '@interfaces/media';
import { Injectable } from '@nestjs/common';
import { SocketService } from '@services/core';
import { MediaDownloadingQueueState } from '@states/media';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class MediaDownloadSocketService {
    constructor(
        private readonly socketService: SocketService,
        private readonly mediaDownloadingQueueState: MediaDownloadingQueueState
    ) {
        this.initMediaQueueObserver();
    }

    private initMediaQueueObserver(): void {
        this.mediaDownloadingQueueState.onMediaAdded$
            .subscribe((mediaQueue) => {
                const mediaQueueDto = adaptMediaDownloadQueueToDto(mediaQueue);

                this.socketService.notifyAll(SocketEventEnum.MediaDownloadStart, mediaQueueDto);
                this.initMediaDownloadProgressObserver(mediaQueue);
                this.initMediaDownloadCancelObserver(mediaQueue);
                this.initMediaDownloadEndObserver(mediaQueue);
            });
    }

    private initMediaDownloadProgressObserver(mediaQueue: MediaDownloadQueue): void {
        mediaQueue.downloadProgress$.pipe(
            tap((downloadProgress) => {
                const progressDto: MediaProgressDto = {
                    id: mediaQueue.id,
                    mediaType: mediaQueue.type,
                    downloadOptions: mediaQueue.options,
                    downloadProgress
                };

                this.socketService.notifyAll(SocketEventEnum.MediaProgress, progressDto);
            })
        )
        .subscribe();
    }

    private initMediaDownloadCancelObserver(mediaQueue: MediaDownloadQueue): void {
        mediaQueue.cancelDownload$.pipe(
            map(() => adaptMediaDownloadQueueToDto(mediaQueue)),
            tap((mediaQueueDto) => this.socketService.notifyAll(SocketEventEnum.MediaDownloadCancel, mediaQueueDto))
        )
        .subscribe();
    }

    private initMediaDownloadEndObserver(mediaQueue: MediaDownloadQueue): void {
        mediaQueue.endDownload$.pipe(
            map(() => adaptMediaDownloadQueueToDto(mediaQueue)),
            tap((mediaQueueDto) => this.socketService.notifyAll(SocketEventEnum.MediaDownloadEnd, mediaQueueDto))
        )
        .subscribe();
    }
}
