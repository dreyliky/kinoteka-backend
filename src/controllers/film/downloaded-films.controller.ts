import { ShortFilm } from '@interfaces/film';
import { Controller, Delete, Get, Param, Response } from '@nestjs/common';
import { DownloadedFilmsService, FilmDownloaderService, FilmMediaPathService } from '@services/film';

@Controller('films/downloaded')
export class DownloadedFilmsController {
    constructor(
        private readonly downloadedFilmsService: DownloadedFilmsService,
        private readonly filmsDownloaderService: FilmDownloaderService,
        private readonly filmMediaPathService: FilmMediaPathService,
    ) {}

    @Get()
    public getAll(): ShortFilm[] {
        return this.downloadedFilmsService.getAll();
    }

    @Get(':kinopoiskId/preview')
    public getPreview(@Param('kinopoiskId') kinopoiskId: string, @Response() response): void {
        const filePath = this.filmMediaPathService.getPreview(kinopoiskId);

        response.sendFile(filePath);
    }

    @Get(':kinopoiskId')
    public get(@Param('kinopoiskId') kinopoiskId: string, @Response() response): void {
        const filePath = this.filmMediaPathService.getMedia(kinopoiskId);
        
        response.sendFile(filePath);
    }

    @Delete(':kinopoiskId')
    public delete(@Param('kinopoiskId') kinopoiskId: string): boolean {
        return this.filmsDownloaderService.delete(kinopoiskId);
    }
}
