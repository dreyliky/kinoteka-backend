import { TvSeriesEpisodeShortMedia, TvSeriesMedia } from '@interfaces/tv-series';

export function adaptTvSeriesEpisodeMediaToShortMedia(
    media: TvSeriesMedia
): TvSeriesEpisodeShortMedia {
    return {
        translationId: media.translation_id,
        maxQuality: media.translation.max_quality,
        translationName: media.translation.smart_title
    };
}