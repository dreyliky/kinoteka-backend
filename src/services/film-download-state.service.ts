import { FilmDownloadStateEnum } from '@enums';
import { Injectable } from '@nestjs/common';
import { FilmsRepository } from '@repositories';
import { DownloadingFilmsState } from '@states';

@Injectable()
export class FilmDownloadStateService {
    constructor(
        private readonly filmsRepository: FilmsRepository,
        private readonly downloadingFilmsState: DownloadingFilmsState
    ) {}

    public check(kinopoiskId: string): FilmDownloadStateEnum {
        if (this.filmsRepository.includes(kinopoiskId)) {
            return FilmDownloadStateEnum.Downloaded;
        } else if (this.downloadingFilmsState.includes(kinopoiskId)) {
            return FilmDownloadStateEnum.Downloading;
        }

        return FilmDownloadStateEnum.Undownloaded;
    }
}
