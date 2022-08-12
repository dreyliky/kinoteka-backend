import { adaptFilmToDetailedInfo, adaptFilmToShortFilm, adaptOriginalFilmsResponseToShortFilmsResponse } from '@adapters/film';
import { environment } from '@environments/environment';
import { VideoCdnFilters, VideoCdnResponse } from '@interfaces/core';
import { Film, FilmDetailedInfoDto, KinopoiskFilmDto, ShortFilm } from '@interfaces/film';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { catchError, forkJoin, map, Observable, of } from 'rxjs';

@Injectable()
export class FilmsService {
    constructor(
        private readonly httpService: HttpService
    ) {}

    public getAllShort(filters: VideoCdnFilters): Observable<VideoCdnResponse<ShortFilm>> {
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

    public getDetailedInfo(kinopoiskId: string): Observable<FilmDetailedInfoDto> {
        return forkJoin([
            this.getShort(kinopoiskId),
            this.getKinopoiskDto(kinopoiskId)
        ])
            .pipe(
                map(([shortFilm, kinopoiskFilmDto]) => adaptFilmToDetailedInfo(shortFilm, kinopoiskFilmDto))
            );
    }

    public get(kinopoiskId: string): Observable<Film> {
        return this.httpService.get(
            `${environment.videoCdnHost}/movies`,
            { params: { query: kinopoiskId, field: 'kinopoisk_id', api_token: environment.videoCdnToken } }
        )
            .pipe(
                map((response) => response.data.data[0])
            );
    }

    private getKinopoiskDto(kinopoiskId: string): Observable<KinopoiskFilmDto> {
        return this.httpService.get<KinopoiskFilmDto>(
            `https://api.kinopoisk.dev/movie`,
            { params: { token: 'ZQQ8GMN-TN54SGK-NB3MKEC-ZKB8V06', field: 'id', search: kinopoiskId } }
        )
            .pipe(
                map((response) => response.data),
                catchError(() => of(null))
            );
    }
}
