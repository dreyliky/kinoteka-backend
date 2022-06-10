import { FilmDownloadStateEnum } from '@enums/film';
import { VideoCdnFilters, VideoCdnResponse } from '@interfaces/core';
import { ShortFilm } from '@interfaces/film';
import { CacheInterceptor, Controller, Get, Param, Post, Query, UseInterceptors } from '@nestjs/common';
import { FilmDownloadStateService, FilmsDownloadingQueueService, FilmsService } from '@services/film';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Controller('films')
export class FilmsController {
    constructor(
        private readonly filmsService: FilmsService,
        private readonly filmsDownloadingQueueService: FilmsDownloadingQueueService,
        private readonly filmDownloadStateService: FilmDownloadStateService
    ) {}

    @Get()
    @UseInterceptors(CacheInterceptor)
    public getAll(@Query() filters: VideoCdnFilters): Observable<VideoCdnResponse<ShortFilm>> {
        return this.filmsService.getAllShort(filters);
    }

    @Get(':kinopoiskId')
    @UseInterceptors(CacheInterceptor)
    public get(@Param('kinopoiskId') kinopoiskId: string): Observable<ShortFilm> {
        return this.filmsService.getShort(kinopoiskId);
    }

    @Post(':kinopoiskId/download/:translationId')
    public download(
        @Param('kinopoiskId') kinopoiskId: string,
        @Param('translationId') translationId: string
    ): Observable<unknown> {
        return this.filmsService.getShort(kinopoiskId)
            .pipe(
                tap((film: ShortFilm) => this.filmsDownloadingQueueService.add(film, +translationId))
            );
    }

    @Get(':kinopoiskId/state')
    public getState(@Param('kinopoiskId') kinopoiskId: string): FilmDownloadStateEnum {
        return this.filmDownloadStateService.check(kinopoiskId);
    }
}
