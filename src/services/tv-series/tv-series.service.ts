import { adaptTvSeriesResponseToShortTvSeriesResponse, adaptTvSeriesToShortTvSeries } from '@adapters/tv-series';
import { environment } from '@environments/environment';
import { VideoCdnFilters, VideoCdnResponse } from '@interfaces/core';
import { ShortTvSeries, TvSeries } from '@interfaces/tv-series';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class TvSeriesService {
    constructor(
        private readonly httpService: HttpService
    ) {}

    public getShort(kinopoiskId: string): Observable<ShortTvSeries> {
        return this.httpService.get<VideoCdnResponse<TvSeries>>(
            `${environment.videoCdnHost}/tv-series`,
            { params: { query: kinopoiskId, field: 'kinopoisk_id', api_token: environment.videoCdnToken } }
        )
            .pipe(
                map((response) => adaptTvSeriesToShortTvSeries(response.data.data[0]))
            );
    }

    public getAllShort(filters: VideoCdnFilters): Observable<VideoCdnResponse<ShortTvSeries>> {
        return this.httpService.get(
            `${environment.videoCdnHost}/tv-series`,
            { params: { ...filters, api_token: environment.videoCdnToken } }
        )
            .pipe(
                map((response) => adaptTvSeriesResponseToShortTvSeriesResponse(response.data))
            );
    }
}
