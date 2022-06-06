import { FilmDownloadStateEnum } from '@enums/film';
import { Injectable } from '@nestjs/common';
import { FilmsRepository } from '@repositories/film';
import { FilmsDownloadingQueueState } from '@states/film';

@Injectable()
export class FilmDownloadStateService {
    constructor(
        private readonly filmsRepository: FilmsRepository,
        private readonly filmsDownloadingQueueService: FilmsDownloadingQueueState
    ) {}

    public check(kinopoiskId: string): FilmDownloadStateEnum {
        if (this.filmsRepository.includes(kinopoiskId)) {
            return FilmDownloadStateEnum.Downloaded;
        } else if (this.filmsDownloadingQueueService.has(kinopoiskId)) {
            return FilmDownloadStateEnum.Downloading;
        }

        return FilmDownloadStateEnum.Undownloaded;
    }
}
