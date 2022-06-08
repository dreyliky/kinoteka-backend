import { FilmDownloadStateEnum } from '@enums/film';
import { VideoCdnFilters, VideoCdnResponse } from '@interfaces/core';
import { ShortFilm } from '@interfaces/film';
import { Controller, Get, Param, Post, Query } from '@nestjs/common';
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
    public getAll(@Query() filters: VideoCdnFilters): Observable<VideoCdnResponse<ShortFilm>> {
        return this.filmsService.getAllShort(filters);
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
