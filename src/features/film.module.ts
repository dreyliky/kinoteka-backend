import { DownloadedFilmsController, DownloadingFilmsController, FilmsController } from '@controllers/film';
import { Module } from '@nestjs/common';
import { FilmsRepository } from '@repositories/film';
import {
    DownloadedFilmsService,
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
        DownloadingFilmsController
    ],
    providers: [
        FilmsRepository,
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
