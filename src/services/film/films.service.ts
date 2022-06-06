import { adaptFilmToShortFilm, adaptOriginalFilmsResponseToShortFilmsResponse } from '@adapters/film';
import { environment } from '@environments/environment';
import { Film, FilmsFilters, ShortFilm, ShortFilmsResponse } from '@interfaces/film';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { FilmsRepository } from '@repositories/film';
import { map, Observable } from 'rxjs';

@Injectable()
export class FilmsService {
    constructor(
        private readonly httpService: HttpService,
        private readonly filmsRepository: FilmsRepository
    ) {}

    public getAllShort(filters: FilmsFilters): Observable<ShortFilmsResponse> {
        return this.httpService.get(
            `${environment.videoCdnHost}/movies`,
            { params: { ...filters, api_token: environment.videoCdnToken } }
        )
            .pipe(
                map((response) => adaptOriginalFilmsResponseToShortFilmsResponse(response.data))
            );
    }

    public getShort(kinopoiskId: string): Observable<ShortFilm> {
        return this.get(kinopoiskId)
            .pipe(
                map((film) => adaptFilmToShortFilm(film))
            );
    }

    public get(kinopoiskId: string): Observable<Film> {
        return this.httpService.get(
            `${environment.videoCdnHost}/movies?api_token=${environment.videoCdnToken}&query=${kinopoiskId}&field=kinopoisk_id`
        )
            .pipe(
                map((response) => response.data.data[0])
            );
    }

    // FIXME: Move to independent service
    public getAllDownloaded(): ShortFilm[] {
        return this.filmsRepository.getAll();
    }
}
