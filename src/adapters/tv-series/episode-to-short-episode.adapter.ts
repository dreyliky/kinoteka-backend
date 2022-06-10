import { TvSeriesEpisode, TvSeriesShortEpisode } from '@interfaces/tv-series';
import { adaptTvSeriesEpisodeMediaToShortMedia } from './episode-media-to-episode-short-media.adapter';

export function adaptTvSeriesEpisodeToShortEpisode(
    episode: TvSeriesEpisode
): TvSeriesShortEpisode {
    return {
        title: episode.ru_title,
        num: episode.num,
        seasonNum: episode.season_num,
        releaseDate: episode.released,
        duration: episode.media[0].duration,
        media: episode.media
            .map((media) => adaptTvSeriesEpisodeMediaToShortMedia(media))
    };
}
