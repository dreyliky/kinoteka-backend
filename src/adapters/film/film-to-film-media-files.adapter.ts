import { Film, FilmMediaFileMetadata } from '@interfaces/film';

export function adaptFilmToFilmMediaFiles(film: Film): FilmMediaFileMetadata[] {
    return film.media
        .map((media) => ({
            id: media.id,
            translationName: media.translation.smart_title
        }));
}
