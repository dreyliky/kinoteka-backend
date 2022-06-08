import { TvSeriesEpisodeShortMedia, TvSeriesMedia } from '@interfaces/tv-series';

export function adaptTvSeriesEpisodeMediaToShortMedia(
    media: TvSeriesMedia
): TvSeriesEpisodeShortMedia {
    return {
        id: media.id,
        translationId: media.translation_id,
        maxQuality: media.translation.max_quality,
        duration: media.duration,
        translationName: media.translation.smart_title
    };
}