import { Film, ShortFilm } from '@interfaces/film';
import { adaptFilmToFilmMediaFiles } from './film-to-film-media-files.adapter';

export function adaptFilmToShortFilm(film: Film): ShortFilm {
    return {
        kinopoiskId: film.kinopoisk_id,
        title: film.ru_title,
        year: film.year,
        iframeSrc: film.preview_iframe_src,
        previewUrl: `https://st.kp.yandex.net/images/sm_film/${film.kinopoisk_id}.jpg`,
        media: adaptFilmToFilmMediaFiles(film)
    };
}
