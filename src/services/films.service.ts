import { adaptFilmToShortFilm, adaptOriginalFilmsResponseToShortFilmsResponse } from '@adapters';
import { VIDEOCDN_TOKEN } from '@data';
import { FilmsFilters, ShortFilm, ShortFilmsResponse } from '@interfaces';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { FilmsRepository } from '@repositories';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class FilmsService {
    constructor(
        private readonly httpService: HttpService,
        private readonly filmsRepository: FilmsRepository
    ) {}

    public getAll(filters: FilmsFilters): Observable<ShortFilmsResponse> {
        return this.httpService.get(
            `${environment.videoCdnHost}/movies`,
            { params: { ...filters, api_token: VIDEOCDN_TOKEN } }
        )
            .pipe(
                map((response) => adaptOriginalFilmsResponseToShortFilmsResponse(response.data))
            );
    }

    public getAllDownloaded(): ShortFilm[] {
        return this.filmsRepository.getAll();
    }

    public get(kinopoiskId: string): Observable<ShortFilm> {
        return this.httpService.get(
            `${environment.videoCdnHost}/movies?api_token=${VIDEOCDN_TOKEN}&query=${kinopoiskId}&field=kinopoisk_id`
        )
            .pipe(
                map((response) => adaptFilmToShortFilm(response.data.data[0]))
            );
    }
}
