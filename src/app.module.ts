import { FilmsController } from '@controllers';
import { FileDownloaderService } from '@core';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { FilmsRepository } from '@repositories';
import { FilmDownloaderService, FilmDownloadStateService, FilmsService } from '@services';
import { DownloadingFilmsState } from './states';

@Module({
    imports: [
        HttpModule
    ],
    controllers: [
        FilmsController
    ],
    providers: [
        FileDownloaderService,
        FilmsRepository,
        FilmDownloadStateService,
        DownloadingFilmsState,
        FilmsService,
        FilmDownloaderService
    ]
})
export class AppModule {}
