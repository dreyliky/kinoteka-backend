import { OriginalFilmsResponse, ShortFilmsResponse } from '@interfaces/film';
import { adaptFilmToShortFilm } from './film-to-short-film.adapter';

export function adaptOriginalFilmsResponseToShortFilmsResponse(response: OriginalFilmsResponse): ShortFilmsResponse {
    return {
        ...response,
        data: response.data.map((film) => adaptFilmToShortFilm(film))
    }
}