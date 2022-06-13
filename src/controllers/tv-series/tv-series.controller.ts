import { VideoCdnFilters, VideoCdnResponse } from '@interfaces/core';
import { ShortTvSeries } from '@interfaces/tv-series';
import { CacheInterceptor, Controller, Get, Param, Query, UseInterceptors } from '@nestjs/common';
import { TvSeriesService } from '@services/tv-series';
import { Observable } from 'rxjs';

@Controller('tv-serieses')
export class TvSeriesesController {
    constructor(
        private readonly tvSeriesService: TvSeriesService
    ) {}

    @Get()
    @UseInterceptors(CacheInterceptor)
    public getAll(@Query() filters: VideoCdnFilters): Observable<VideoCdnResponse<ShortTvSeries>> {
        return this.tvSeriesService.getAllShort(filters);
    }

    @Get(':kinopoiskId')
    @UseInterceptors(CacheInterceptor)
    public get(@Param('kinopoiskId') kinopoiskId: string): Observable<ShortTvSeries> {
        return this.tvSeriesService.getShort(kinopoiskId);
    }
}
