import { TvSeriesEpisodeShortMedia } from './tv-series-episode-short-media.interface';

export interface TvSeriesShortEpisode {
    readonly kinopoiskId: string;
    readonly title: string;
    readonly seasonNum: number;
    readonly releaseDate: string;
    readonly media: TvSeriesEpisodeShortMedia[];
}
