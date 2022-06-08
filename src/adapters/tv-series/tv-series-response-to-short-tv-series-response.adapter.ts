import { VideoCdnResponse } from '@interfaces/core';
import { TvSeries } from '@interfaces/tv-series';
import { ShortTvSeries } from '@interfaces/tv-series/short-tv-series.interface';
import { adaptTvSeriesToShortTvSeries } from './tv-series-to-short-tv-series.adapter';

export function adaptTvSeriesResponseToShortTvSeriesResponse(
    response: VideoCdnResponse<TvSeries>
): VideoCdnResponse<ShortTvSeries> {
    return {
        ...response,
        data: response.data.map((tvSeries) => adaptTvSeriesToShortTvSeries(tvSeries))
    };
}
