import { ShortFilmQueue } from '@classes';
import { SocketService } from '@core';
import { SocketEventEnum } from '@enums';
import { FilmProgressDto } from '@interfaces/film-progress-dto.interface';
import { Injectable } from '@nestjs/common';
import { FilmsDownloadingQueueState } from '@states';
import { tap } from 'rxjs/operators';

@Injectable()
export class FilmsDownloadSocketService {
    constructor(
        private readonly socketService: SocketService,
        private readonly filmsDownloadingQueueState: FilmsDownloadingQueueState
    ) {
        this.initFilmQueueObserver();
    }

    private initFilmQueueObserver(): void {
        this.filmsDownloadingQueueState.onFilmAdded$
            .subscribe((film) => {
                this.initFilmDownloadProgressObserver(film);
                this.initFilmDownloadCancelObserver(film);
                this.initFilmDownloadEndObserver(film);
            });
    }

    private initFilmDownloadProgressObserver(film: ShortFilmQueue): void {
        film.downloadProgress$.pipe(
            tap((downloadProgress) => {
                const dto: FilmProgressDto = { kinopoiskId: film.data.kinopoiskId, downloadProgress };
                this.socketService.sockets
                    .forEach((socket) => socket.emit(SocketEventEnum.FilmProgress, dto));
            })
        )
        .subscribe();
    }
    
    private initFilmDownloadCancelObserver(film: ShortFilmQueue): void {
        film.cancelDownload$.pipe(
            tap(() => {
                this.socketService.sockets
                    .forEach((socket) => socket.emit(SocketEventEnum.FilmDownloadCancel, film.data.kinopoiskId));
            })
        )
        .subscribe();
    }

    private initFilmDownloadEndObserver(film: ShortFilmQueue): void {
        film.endDownload$.pipe(
            tap(() => {
                this.socketService.sockets
                    .forEach((socket) => socket.emit(SocketEventEnum.FilmDownloadEnd, film.data.kinopoiskId));
            })
        )
        .subscribe();
    }
}
