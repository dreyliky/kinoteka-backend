import {
    DownloadedFilmsController,
    DownloadingFilmsController,
    FavoriteFilmsController,
    FilmsController
} from '@controllers/film';
import { Module } from '@nestjs/common';
import { FavoriteFilmsRepository, FilmsRepository } from '@repositories/film';
import {
    DownloadedFilmsService,
    FavoriteFilmsService,
    FilmDownloaderService,
    FilmDownloadStateService,
    FilmMediaPathService,
    FilmsDownloadingCountSocketService,
    FilmsDownloadingQueueService,
    FilmsDownloadSocketService,
    FilmsService
} from '@services/film';
import { FilmsDownloadingQueueState } from '@states/film';
import { SharedModule } from '../shared.module';

@Module({
    imports: [
        SharedModule
    ],
    controllers: [
        FilmsController,
        DownloadedFilmsController,
        DownloadingFilmsController,
        FavoriteFilmsController
    ],
    providers: [
        FilmsRepository,
        FavoriteFilmsRepository,
        FavoriteFilmsService,
        DownloadedFilmsService,
        FilmMediaPathService,
        FilmDownloadStateService,
        FilmsDownloadingQueueState,
        FilmsService,
        FilmsDownloadingQueueService,
        FilmDownloaderService,
        FilmsDownloadingCountSocketService,
        FilmsDownloadSocketService
    ]
})
export class FilmModule {}
