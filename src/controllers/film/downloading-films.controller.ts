import { adaptShortFilmQueueToDto } from '@adapters/film';
import { ShortFilmQueueDto } from '@interfaces/film';
import { Controller, Delete, Get, Param } from '@nestjs/common';
import { FilmsDownloadingQueueService } from '@services/film';

@Controller('films/downloading')
export class DownloadingFilmsController {
    constructor(
        private readonly filmsDownloadingQueueService: FilmsDownloadingQueueService
    ) {}

    @Get()
    public getAll(): ShortFilmQueueDto[] {
        return this.filmsDownloadingQueueService.getAll()
            .map((filmQueue) => adaptShortFilmQueueToDto(filmQueue));
    }

    @Delete(':kinopoiskId')
    public delete(@Param('kinopoiskId') kinopoiskId: string): null {
        this.filmsDownloadingQueueService.remove(kinopoiskId);

        return null;
    }
}
