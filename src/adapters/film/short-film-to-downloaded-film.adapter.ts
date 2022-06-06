import { DownloadedFilm, ShortFilm } from '@interfaces/film';

export function adaptShortFilmToDownloadedFilm(film: ShortFilm, translationId: number): DownloadedFilm {
    return {
        title: film.title,
        kinopoiskId: film.kinopoiskId,
        year: film.year,
        media: film.media
            .find((media) => (media.translationId === translationId))
    };
}
