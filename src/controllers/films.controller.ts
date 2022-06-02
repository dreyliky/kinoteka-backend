import { FilmDownloadStateEnum } from '@enums';
import { FilmsFilters, ShortFilm, ShortFilmsResponse } from '@interfaces';
import { Controller, Delete, Get, Param, Post, Query, Response } from '@nestjs/common';
import { FilmDownloaderService, FilmDownloadStateService, FilmsService } from '@services';
import { Observable, switchMap } from 'rxjs';

@Controller('films')
export class FilmsController {
    constructor(
        private readonly filmsService: FilmsService,
        private readonly filmsDownloaderService: FilmDownloaderService,
        private readonly filmDownloadStateService: FilmDownloadStateService
    ) {}

    @Get()
    public getAll(@Query() filters: FilmsFilters): Observable<ShortFilmsResponse> {
        return this.filmsService.getAll(filters);
    }

    @Get('/downloaded')
    public getAllDownloaded(): ShortFilm[] {
        return this.filmsService.getAllDownloaded();
    }

    @Get(':kinopoiskId/preview')
    public getPreview(@Param('kinopoiskId') kinopoiskId: string, @Response() response): void {
        response.sendFile(`${global.__basedir}/downloads/${kinopoiskId}.jpg`);
    }

    @Get(':kinopoiskId/downloaded')
    public getDownloaded(@Param('kinopoiskId') kinopoiskId: string, @Response() response): void {
        response.sendFile(`${global.__basedir}/downloads/${kinopoiskId}.mp4`);
    }

    @Get(':kinopoiskId/state')
    public isDownloaded(@Param('kinopoiskId') kinopoiskId: string): FilmDownloadStateEnum {
        return this.filmDownloadStateService.check(kinopoiskId);
    }

    @Post(':kinopoiskId/download')
    public download(@Param('kinopoiskId') kinopoiskId: string): Observable<unknown> {
        return this.filmsService.get(kinopoiskId)
            .pipe(
                switchMap((film) => this.filmsDownloaderService.download(film))
            );
    }

    @Delete(':kinopoiskId/downloaded')
    public deleteDownloaded(@Param('kinopoiskId') kinopoiskId: string): boolean {
        return this.filmsDownloaderService.delete(kinopoiskId);
    }
}
