import { AssetsController } from './assets';
import { ClientsController } from './client';
import {
    BookmarkedFilmsController,
    DownloadedFilmsController,
    FavoriteFilmsController,
    FilmPlaylistsCategoriesController,
    FilmPlaylistsController,
    FilmsController,
    PlaylistFilmsController
} from './film';
import { DownloadingMediaController } from './media';
import { BookmarkedTvSeriesesController, TvSeriesesController } from './tv-series';
import {
    BookmarkedVideosController,
    DownloadedVideosController,
    VideosController
} from './video';

export const CONTROLLERS = [
    AssetsController,

    ClientsController,

    BookmarkedFilmsController,
    DownloadedFilmsController,
    FavoriteFilmsController,
    FilmPlaylistsCategoriesController,
    FilmPlaylistsController,
    FilmsController,
    PlaylistFilmsController,

    DownloadingMediaController,

    TvSeriesesController,
    BookmarkedTvSeriesesController,

    VideosController,
    DownloadedVideosController,
    BookmarkedVideosController
];
