import { FILM_PLAYLIST_CATEGORIES } from '@data/film-playlist-categories';
import { FilmPlaylistCategoryEnum } from '@enums/film';
import { PlaylistCategory } from '@interfaces/playlist';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FilmPlaylistCategoriesService {
    public getAll(): PlaylistCategory<FilmPlaylistCategoryEnum>[] {
        return FILM_PLAYLIST_CATEGORIES;
    }
}
