import { adaptMediaDownloadQueueToDto } from '@adapters/film';
import { MediaDownloadQueueDto } from '@interfaces/core';
import { Controller, Delete, Get, Param } from '@nestjs/common';
import { FilmsDownloadingQueueService } from '@services/film';

@Controller('downloading-films')
export class DownloadingFilmsController {
    constructor(
        private readonly filmsDownloadingQueueService: FilmsDownloadingQueueService
    ) {}

    @Get()
    public getAll(): MediaDownloadQueueDto[] {
        return this.filmsDownloadingQueueService.getAll()
            .map((filmQueue) => adaptMediaDownloadQueueToDto(filmQueue));
    }

    @Delete(':kinopoiskId')
    public delete(@Param('kinopoiskId') kinopoiskId: string): null {
        this.filmsDownloadingQueueService.remove(kinopoiskId);

        return null;
    }
}
