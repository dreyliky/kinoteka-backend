import { TvSeriesEpisode, TvSeriesShortEpisode } from '@interfaces/tv-series';
import { adaptTvSeriesEpisodeMediaToShortMedia } from './episode-media-to-episode-short-media.adapter';

export function adaptTvSeriesEpisodeToShortEpisode(
    episode: TvSeriesEpisode
): TvSeriesShortEpisode {
    return {
        kinopoiskId: episode.kinopoisk_id,
        title: episode.ru_title,
        seasonNum: episode.season_num,
        releaseDate: episode.released,
        media: episode.media
            .map((media) => adaptTvSeriesEpisodeMediaToShortMedia(media))
    };
}
