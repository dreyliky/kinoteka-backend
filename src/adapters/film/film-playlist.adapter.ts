import { FilmPlaylistEnum } from '@enums/film';
import { AppHelper } from '@helpers/core';
import { Playlist } from '@interfaces/playlist';

export function adaptFilmPlaylist(playlist: Playlist<FilmPlaylistEnum>): Playlist<FilmPlaylistEnum> {
    return {
        ...playlist,
        imageUrl: `${AppHelper.host}/assets/images/film/playlist/${playlist.imageUrl}`
    };
}
