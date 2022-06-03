import { SocketService } from '@core';
import { SocketEventEnum } from '@enums';
import { Injectable } from '@nestjs/common';
import { FilmsDownloadingQueueState } from '@states';
import { map } from 'rxjs/operators';

@Injectable()
export class FilmsDownloadingCountSocketService {
    constructor(
        private readonly socketService: SocketService,
        private readonly filmsDownloadingQueueState: FilmsDownloadingQueueState
    ) {
        this.initFilmsQueueUpdatesObserver();
    }

    private initFilmsQueueUpdatesObserver(): void {
        this.filmsDownloadingQueueState.onQueueUpdated$
            .pipe(
                map(() => this.filmsDownloadingQueueState.getAll().length)
            )
            .subscribe((count) => {
                console.log(count);
                this.socketService.sockets
                    .forEach((socket) => socket.emit(SocketEventEnum.DownloadingFilmsCount, count));
            });
    }
}
