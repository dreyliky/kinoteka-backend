import { Film, FilmMediaFileMetadata } from '@interfaces';

export function adaptFilmToFilmMediaFiles(film: Film): FilmMediaFileMetadata[] {
    return film.media
        .map((media) => ({
            id: media.id,
            translationName: media.translation.smart_title
        }));
}
