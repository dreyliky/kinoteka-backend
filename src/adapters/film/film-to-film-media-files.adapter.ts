import { Film, FilmMediaFileMetadata } from '@interfaces/film';

export function adaptFilmToFilmMediaFiles(film: Film): FilmMediaFileMetadata[] {
    return film.media
        .map((media) => ({
            id: media.id,
            translationId: media.translation_id,
            translationName: media.translation.smart_title,
            maxQuality: media.max_quality,
            duration: media.duration
        }));
}
