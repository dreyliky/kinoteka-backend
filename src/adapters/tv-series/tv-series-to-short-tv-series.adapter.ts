import { ShortTvSeries, TvSeries } from '@interfaces/tv-series';
import { adaptTvSeriesEpisodeToShortEpisode } from './episode-to-short-episode.adapter';

export function adaptTvSeriesToShortTvSeries(tvSeries: TvSeries): ShortTvSeries {
    return {
        title: tvSeries.ru_title,
        kinopoiskId: tvSeries.kinopoisk_id,
        episodeCount: tvSeries.episode_count,
        seasonCount: tvSeries.season_count,
        previewUrl: `https://st.kp.yandex.net/images/sm_film/${tvSeries.kinopoisk_id}.jpg`,
        startDate: tvSeries.start_date,
        endDate: tvSeries.end_date,
        iframeSrc: tvSeries.preview_iframe_src,
        episodes: tvSeries.episodes
            .map((episode) => adaptTvSeriesEpisodeToShortEpisode(episode))
    };
}
