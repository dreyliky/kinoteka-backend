import { VideoCdnResponse } from '@interfaces/core';
import { Film, ShortFilm } from '@interfaces/film';
import { adaptFilmToShortFilm } from './film-to-short-film.adapter';

export function adaptOriginalFilmsResponseToShortFilmsResponse(
    response: VideoCdnResponse<Film>
): VideoCdnResponse<ShortFilm> {
    return {
        ...response,
        data: response.data.map((film) => adaptFilmToShortFilm(film))
    }
}
