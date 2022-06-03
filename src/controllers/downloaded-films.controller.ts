import { ShortFilm } from '@interfaces';
import { Controller, Delete, Get, Param, Response } from '@nestjs/common';
import { FilmDownloaderService, FilmsService } from '@services';

@Controller('films/downloaded')
export class DownloadedFilmsController {
    constructor(
        private readonly filmsService: FilmsService,
        private readonly filmsDownloaderService: FilmDownloaderService
    ) {}

    @Get()
    public getAll(): ShortFilm[] {
        return this.filmsService.getAllDownloaded();
    }

    @Get(':kinopoiskId/preview')
    public getPreview(@Param('kinopoiskId') kinopoiskId: string, @Response() response): void {
        response.sendFile(`${global.__basedir}/downloads/${kinopoiskId}.jpg`);
    }

    @Get(':kinopoiskId')
    public get(@Param('kinopoiskId') kinopoiskId: string, @Response() response): void {
        response.sendFile(`${global.__basedir}/downloads/${kinopoiskId}.mp4`);
    }

    @Delete(':kinopoiskId')
    public delete(@Param('kinopoiskId') kinopoiskId: string): boolean {
        return this.filmsDownloaderService.delete(kinopoiskId);
    }
}
