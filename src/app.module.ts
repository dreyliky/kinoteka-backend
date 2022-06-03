import { DownloadedFilmsController, DownloadingFilmsController, FilmsController } from '@controllers';
import { FileDownloaderService, SocketService } from '@core';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { FilmsRepository } from '@repositories';
import {
    FilmDownloaderService,
    FilmDownloadStateService,
    FilmsDownloadingQueueService,
    FilmsDownloadSocketService,
    FilmsService
} from '@services';
import { FilmsDownloadingQueueState } from './states';

@Module({
    imports: [
        HttpModule
    ],
    controllers: [
        FilmsController,
        DownloadedFilmsController,
        DownloadingFilmsController
    ],
    providers: [
        SocketService,
        FileDownloaderService,
        FilmsRepository,
        FilmDownloadStateService,
        FilmsDownloadingQueueState,
        FilmsService,
        FilmsDownloadingQueueService,
        FilmDownloaderService,
        FilmsDownloadSocketService
    ]
})
export class AppModule {}
