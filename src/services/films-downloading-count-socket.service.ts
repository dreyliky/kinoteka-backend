import { SocketService } from '@core';
import { SocketEventEnum } from '@enums';
import { Injectable } from '@nestjs/common';
import { FilmsDownloadingQueueState } from '@states';
import { map } from 'rxjs/operators';

@Injectable()
export class FilmsDownloadingCountSocketService {
    private data: number = 0;

    constructor(
        private readonly socketService: SocketService,
        private readonly filmsDownloadingQueueState: FilmsDownloadingQueueState
    ) {
        this.initFilmsQueueUpdatesObserver();
        this.initSocketConnectionObserver();
    }

    private initFilmsQueueUpdatesObserver(): void {
        this.filmsDownloadingQueueState.onQueueUpdated$
            .pipe(
                map(() => this.filmsDownloadingQueueState.getAll().length)
            )
            .subscribe((count) => {
                this.data = count;

                this.socketService.notifyAll(SocketEventEnum.DownloadingFilmsCount, count);
            });
    }

    private initSocketConnectionObserver(): void {
        this.socketService.onSocketConnect$
            .subscribe((socket) => socket.emit(SocketEventEnum.DownloadingFilmsCount, this.data));
    }
}
