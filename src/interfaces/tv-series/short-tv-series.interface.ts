import { TvSeriesShortEpisode } from './tv-series-short-episode.interface';

export interface ShortTvSeries {
    readonly title: string;
    readonly kinopoiskId: string;
    readonly seasonCount: number;
    readonly episodeCount: number;
    readonly startDate: string;
    readonly endDate: string | null;
    readonly previewUrl: string;
    readonly iframeSrc: string;
    readonly episodes: TvSeriesShortEpisode[];
}
