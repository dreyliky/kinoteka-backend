import { ShortFilm } from '@interfaces/film';
import { Controller, Delete, Get, Param, Response } from '@nestjs/common';
import { FilmDownloaderService, FilmsService } from '@services/film';

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
        response.sendFile(`${global.__downloadFolder}/${kinopoiskId}.jpg`);
    }

    @Get(':kinopoiskId')
    public get(@Param('kinopoiskId') kinopoiskId: string, @Response() response): void {
        response.sendFile(`${global.__downloadFolder}/${kinopoiskId}.mp4`);
    }

    @Delete(':kinopoiskId')
    public delete(@Param('kinopoiskId') kinopoiskId: string): boolean {
        return this.filmsDownloaderService.delete(kinopoiskId);
    }
}
