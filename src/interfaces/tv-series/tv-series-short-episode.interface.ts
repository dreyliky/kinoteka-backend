import { TvSeriesEpisodeShortMedia } from './tv-series-episode-short-media.interface';

export interface TvSeriesShortEpisode {
    readonly title: string;
    readonly num: string;
    readonly seasonNum: number;
    readonly releaseDate: string;
    readonly duration: number;
    readonly media: TvSeriesEpisodeShortMedia[];
}
