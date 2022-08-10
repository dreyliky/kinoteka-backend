import { FilmFromDB, FilmShortMedia, ShortFilm } from '@interfaces/film';

function adaptFilmFromDbToShortMedia(film: FilmFromDB): FilmShortMedia[] {
    return film.translations
        .map((translation) => (<FilmShortMedia>{
            id: null,
            translationId: null,
            maxQuality: null,
            translationName: translation,
            duration: null
        }));
}

export function adaptFilmFromDbToShortFilm(film: FilmFromDB): ShortFilm {
    return {
        kinopoiskId: film.kp_id,
        title: film.title,
        year: film.year,
        iframeSrc: film.iframe_src,
        previewUrl: `https://st.kp.yandex.net/images/sm_film/${film.kp_id}.jpg`,
        media: adaptFilmFromDbToShortMedia(film)
    };
}
