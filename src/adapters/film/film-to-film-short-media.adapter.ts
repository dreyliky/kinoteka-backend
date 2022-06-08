import { Film, FilmShortMedia } from '@interfaces/film';

export function adaptFilmToFilmShortMedia(film: Film): FilmShortMedia[] {
    return film.media
        .map((media) => ({
            id: media.id,
            translationId: media.translation_id,
            translationName: media.translation.smart_title,
            maxQuality: media.max_quality,
            duration: media.duration
        }));
}
