import { Film, ShortFilm } from '@interfaces';

export function adaptFilmToShortFilm(film: Film): ShortFilm {
    return {
        kinopoiskId: film.kinopoisk_id,
        title: film.ru_title,
        year: film.year,
        iframeSrc: film.preview_iframe_src,
        translation: film.translations?.[0]?.title || 'Невідомо',
        previewUrl: `https://st.kp.yandex.net/images/sm_film/${film.kinopoisk_id}.jpg`
    };
}
