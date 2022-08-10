import { adaptFilmFromDbToShortFilm } from '@adapters/film';
import { FILM_PLAYLISTS_CONTENT_MAP } from '@data/film-playlists';
import filmsDictionary from '@db/films-dictionary.json';
import { FilmPlaylistEnum } from '@enums/film';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PlaylistFilmsService {
    public getAll(playlistId: FilmPlaylistEnum): unknown[] {
        return FILM_PLAYLISTS_CONTENT_MAP.get(playlistId)
            .filter((filmKinopoiskId) => !!filmsDictionary[filmKinopoiskId])
            .map((filmKinopoiskId) => adaptFilmFromDbToShortFilm(filmsDictionary[filmKinopoiskId]));
    }
}
