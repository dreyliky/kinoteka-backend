import { adaptFilmPlaylist } from '@adapters/film';
import { FILM_PLAYLISTS_MAP } from '@data/film-playlists';
import { FilmPlaylistCategoryEnum, FilmPlaylistEnum } from '@enums/film';
import { Playlist } from '@interfaces/playlist';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FilmPlaylistsService {
    public getAll(categoryId: FilmPlaylistCategoryEnum): Playlist<FilmPlaylistEnum>[] {
        return FILM_PLAYLISTS_MAP.get(categoryId)
            .map((playlist) => adaptFilmPlaylist(playlist));
    }

    public getById(playlistId: FilmPlaylistEnum): Playlist<FilmPlaylistEnum> {
        const targetPlaylist = [...FILM_PLAYLISTS_MAP.values()]
            .flat()
            .find((playlist) => (playlist.id === playlistId));
            
        return adaptFilmPlaylist(targetPlaylist);
    }
}
