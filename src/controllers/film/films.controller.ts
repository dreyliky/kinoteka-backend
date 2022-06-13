import { FilmDownloadStatusEnum } from '@enums/film';
import { MediaTypeEnum } from '@enums/media';
import { VideoCdnFilters, VideoCdnResponse } from '@interfaces/core';
import { FilmDownloaderOptions, ShortFilm } from '@interfaces/film';
import { CacheInterceptor, Controller, Get, Param, Post, Query, UseInterceptors } from '@nestjs/common';
import { DownloadedFilmsService, FilmsService } from '@services/film';
import { MediaDownloadingQueueService } from '@services/media';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Controller('films')
export class FilmsController {
    constructor(
        private readonly filmsService: FilmsService,
        private readonly downloadedFilmsService: DownloadedFilmsService,
        private readonly mediaDownloadingQueueService: MediaDownloadingQueueService
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

    @Get(':kinopoiskId/status')
    public getStatus(@Param('kinopoiskId') kinopoiskId: string): FilmDownloadStatusEnum {
        const mediaInDownloadQueue = this.mediaDownloadingQueueService
            .getBySelector<ShortFilm>((media) => (media.kinopoiskId === kinopoiskId));

        if (this.downloadedFilmsService.includes(kinopoiskId)) {
            return FilmDownloadStatusEnum.Downloaded;
        } else if (mediaInDownloadQueue) {
            return FilmDownloadStatusEnum.Downloading;
        }

        return FilmDownloadStatusEnum.Undownloaded;
    }

    @Post(':kinopoiskId/download/:translationId')
    public download(
        @Param('kinopoiskId') kinopoiskId: string,
        @Param('translationId') translationId: string
    ): Observable<unknown> {
        return this.filmsService.getShort(kinopoiskId)
            .pipe(
                tap((film: ShortFilm) => {
                    const downloadOptions: FilmDownloaderOptions = {
                        kinopoiskId,
                        translationId: +translationId
                    };

                    this.mediaDownloadingQueueService.add(MediaTypeEnum.Film, film, downloadOptions);
                })
            );
    }
}
