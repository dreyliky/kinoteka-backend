import { FilmPlaylistCategoryEnum } from '@enums/film';
import { PlaylistCategory } from '@interfaces/playlist';

export const FILM_PLAYLIST_CATEGORIES: PlaylistCategory<FilmPlaylistCategoryEnum>[] = [
    {
        id: FilmPlaylistCategoryEnum.Best,
        name: 'Найкращі'
    },
    {
        id: FilmPlaylistCategoryEnum.Genres,
        name: 'Жанри'
    },
    {
        id: FilmPlaylistCategoryEnum.Thematic,
        name: 'Тематика'
    }
];
