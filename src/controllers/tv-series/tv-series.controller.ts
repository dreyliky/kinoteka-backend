import { VideoCdnFilters, VideoCdnResponse } from '@interfaces/core';
import { ShortTvSeries } from '@interfaces/tv-series';
import { CacheInterceptor, Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { TvSeriesService } from '@services/tv-series';
import { Observable } from 'rxjs';

@Controller('tv-serieses')
export class TvSeriesController {
    constructor(
        private readonly tvSeriesService: TvSeriesService
    ) {}

    @Get()
    @UseInterceptors(CacheInterceptor)
    public getAll(@Query() filters: VideoCdnFilters): Observable<VideoCdnResponse<ShortTvSeries>> {
        return this.tvSeriesService.getAllShort(filters);
    }
}
