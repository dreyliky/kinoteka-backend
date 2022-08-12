import { ShortFilm } from './short-film.interface';

export interface FilmDetailedInfoDto extends ShortFilm {
    readonly description: string;
    readonly posterUrl: string;
    readonly backdropUrl: string;
    readonly kinopoiskRating: number;
    readonly imdbRating: number;
    readonly genres: string[];
    readonly countries: string[];
    readonly ageRating: number;
}
