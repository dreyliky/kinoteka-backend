import { SocketService } from '@core';
import { SocketEventEnum } from '@enums';
import { Injectable } from '@nestjs/common';
import { FilmsDownloadingQueueState } from '@states';
import { distinctUntilChanged, map } from 'rxjs/operators';

@Injectable()
export class FilmsDownloadingCountService {
    constructor(
        private readonly socketService: SocketService,
        private readonly filmsDownloadingQueueState: FilmsDownloadingQueueState
    ) {
        this.initFilmsQueueUpdatesObserver();
    }

    private initFilmsQueueUpdatesObserver(): void {
        this.filmsDownloadingQueueState.onQueueUpdated$
            .pipe(
                map(() => this.filmsDownloadingQueueState.getAll().length),
                distinctUntilChanged()
            )
            .subscribe((count) => {
                this.socketService.sockets
                    .forEach((socket) => socket.emit(SocketEventEnum.DownloadingFilmsCount, count));
            });
    }
}
