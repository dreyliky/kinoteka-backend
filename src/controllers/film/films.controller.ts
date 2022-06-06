import { FilmDownloadStateEnum } from '@enums/film';
import { FilmMediaFileMetadata, FilmsFilters, ShortFilm, ShortFilmsResponse } from '@interfaces/film';
import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { FilmDownloadStateService, FilmMediaFilesService, FilmsDownloadingQueueService, FilmsService } from '@services/film';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Controller('films')
export class FilmsController {
    constructor(
        private readonly filmsService: FilmsService,
        private readonly filmMediaFilesService: FilmMediaFilesService,
        private readonly filmsDownloadingQueueService: FilmsDownloadingQueueService,
        private readonly filmDownloadStateService: FilmDownloadStateService
    ) {}

    @Get()
    public getAll(@Query() filters: FilmsFilters): Observable<ShortFilmsResponse> {
        return this.filmsService.getAllShort(filters);
    }

    @Get(':kinopoiskId/media-files')
    public getTranslations(@Param('kinopoiskId') kinopoiskId: string): Observable<FilmMediaFileMetadata[]> {
        return this.filmsService.get(kinopoiskId)
            .pipe(
                map((film) => this.filmMediaFilesService.getAll(film))
            );
    }

    @Post(':kinopoiskId/download')
    public download(@Param('kinopoiskId') kinopoiskId: string): Observable<unknown> {
        return this.filmsService.getShort(kinopoiskId)
            .pipe(
                tap((film: ShortFilm) => this.filmsDownloadingQueueService.add(film))
            );
    }

    @Get(':kinopoiskId/state')
    public getState(@Param('kinopoiskId') kinopoiskId: string): FilmDownloadStateEnum {
        return this.filmDownloadStateService.check(kinopoiskId);
    }
}
