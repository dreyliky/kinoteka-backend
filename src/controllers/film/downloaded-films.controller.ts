import { DownloadedFilm } from '@interfaces/film';
import { Controller, Delete, Get, Param, Response } from '@nestjs/common';
import { DownloadedFilmsService, FilmDownloaderService, FilmMediaPathService } from '@services/film';

@Controller('downloaded-films')
export class DownloadedFilmsController {
    constructor(
        private readonly downloadedFilmsService: DownloadedFilmsService,
        private readonly filmsDownloaderService: FilmDownloaderService,
        private readonly filmMediaPathService: FilmMediaPathService,
    ) {}

    @Get()
    public getAll(): DownloadedFilm[] {
        return this.downloadedFilmsService.getAll();
    }

    @Get(':kinopoiskId')
    public get(@Param('kinopoiskId') kinopoiskId: string): DownloadedFilm {
        return this.downloadedFilmsService.get(kinopoiskId);
    }

    @Get(':kinopoiskId/preview')
    public getPreview(@Param('kinopoiskId') kinopoiskId: string, @Response() response): void {
        const filePath = this.filmMediaPathService.getPreview(kinopoiskId);

        response.sendFile(filePath);
    }

    @Get(':kinopoiskId/media')
    public getMedia(@Param('kinopoiskId') kinopoiskId: string, @Response() response): void {
        const filePath = this.filmMediaPathService.getMedia(kinopoiskId);
        
        response.sendFile(filePath);
    }

    @Delete(':kinopoiskId')
    public delete(@Param('kinopoiskId') kinopoiskId: string): null {
        this.filmsDownloaderService.deleteById(kinopoiskId);

        return null;
    }
}
