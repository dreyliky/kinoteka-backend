import { SocketEventEnum } from '@enums/core';
import { Injectable } from '@nestjs/common';
import { SocketService } from '@services/core';
import { MediaDownloadingQueueState } from '@states/media';
import { map } from 'rxjs/operators';

@Injectable()
export class MediaDownloadingCountSocketService {
    private data: number = 0;

    constructor(
        private readonly socketService: SocketService,
        private readonly mediaDownloadingQueueState: MediaDownloadingQueueState
    ) {
        this.initFilmsQueueUpdatesObserver();
        this.initSocketConnectionObserver();
    }

    private initFilmsQueueUpdatesObserver(): void {
        this.mediaDownloadingQueueState.onQueueUpdated$
            .pipe(
                map(() => this.mediaDownloadingQueueState.getAll().length)
            )
            .subscribe((count) => {
                this.data = count;

                this.socketService.notifyAll(SocketEventEnum.DownloadingMediaCount, count);
            });
    }

    private initSocketConnectionObserver(): void {
        this.socketService.onSocketConnect$
            .subscribe((socket) => socket.emit(SocketEventEnum.DownloadingMediaCount, this.data));
    }
}
