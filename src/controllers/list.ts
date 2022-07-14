import { ClientsController } from './client';
import { BookmarkedFilmsController, DownloadedFilmsController, FavoriteFilmsController, FilmsController } from './film';
import { DownloadingMediaController } from './media';
import { TvSeriesesController } from './tv-series';
import { BookmarkedVideosController, DownloadedVideosController, VideosController } from './video';

export const CONTROLLERS = [
    ClientsController,

    DownloadedFilmsController,
    FavoriteFilmsController,
    FilmsController,
    BookmarkedFilmsController,

    DownloadingMediaController,

    TvSeriesesController,

    VideosController,
    DownloadedVideosController,
    BookmarkedVideosController
];
