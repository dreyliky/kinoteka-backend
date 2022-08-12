import { FilmDetailedInfoDto, KinopoiskFilmDto, ShortFilm } from '@interfaces/film';

export function adaptFilmToDetailedInfo(
    shortFilm: ShortFilm,
    kinopoiskDto: KinopoiskFilmDto
): FilmDetailedInfoDto {
    return {
        ...shortFilm,
        description: kinopoiskDto.description,
        posterUrl: kinopoiskDto.poster.url,
        backdropUrl: kinopoiskDto.backdrop.url,
        kinopoiskRating: kinopoiskDto.rating.kp,
        imdbRating: kinopoiskDto.rating.imdb,
        genres: kinopoiskDto.genres
            .map((genre) => genre.name),
        countries: kinopoiskDto.countries
            .map((country) => country.name),
        ageRating: kinopoiskDto.ageRating
    };
}
