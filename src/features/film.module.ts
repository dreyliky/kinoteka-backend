import { DownloadedFilmsController, DownloadingFilmsController, FilmsController } from '@controllers/film';
import { Module } from '@nestjs/common';
import { FilmsRepository } from '@repositories/film';
import {
    FilmDownloaderService,
    FilmDownloadStateService,
    FilmMediaFilesService,
    FilmsDownloadingCountSocketService,
    FilmsDownloadingQueueService,
    FilmsDownloadSocketService,
    FilmsService
} from '@services/film';
import { FilmsDownloadingQueueState } from '@states/film';
import { SharedModule } from 'src/shared.module';

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
        FilmDownloadStateService,
        FilmsDownloadingQueueState,
        FilmsService,
        FilmsDownloadingQueueService,
        FilmDownloaderService,
        FilmMediaFilesService,
        FilmsDownloadingCountSocketService,
        FilmsDownloadSocketService
    ]
})
export class FilmModule {}
