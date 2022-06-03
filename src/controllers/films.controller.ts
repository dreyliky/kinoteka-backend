import { FilmDownloadStateEnum } from '@enums';
import { FilmsFilters, ShortFilm, ShortFilmsResponse } from '@interfaces';
import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { FilmDownloaderService, FilmDownloadStateService, FilmsDownloadingQueueService, FilmsService } from '@services';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Controller('films')
export class FilmsController {
    constructor(
        private readonly filmsService: FilmsService,
        private readonly filmsDownloaderService: FilmDownloaderService,
        private readonly filmsDownloadingQueueService: FilmsDownloadingQueueService,
        private readonly filmDownloadStateService: FilmDownloadStateService
    ) {}

    @Get()
    public getAll(@Query() filters: FilmsFilters): Observable<ShortFilmsResponse> {
        return this.filmsService.getAll(filters);
    }

    @Post(':kinopoiskId/download')
    public download(@Param('kinopoiskId') kinopoiskId: string): Observable<unknown> {
        return this.filmsService.get(kinopoiskId)
            .pipe(
                tap((film: ShortFilm) => this.filmsDownloadingQueueService.add(film))
            );
    }

    @Get(':kinopoiskId/state')
    public getState(@Param('kinopoiskId') kinopoiskId: string): FilmDownloadStateEnum {
        return this.filmDownloadStateService.check(kinopoiskId);
    }
}
