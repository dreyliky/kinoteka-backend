import { ClientsController } from './client';
import { DownloadedFilmsController, FavoriteFilmsController, FilmsController } from './film';
import { DownloadingMediaController } from './media';
import { TvSeriesesController } from './tv-series';
import { DownloadedVideosController, VideosController } from './video';

export const CONTROLLERS = [
    ClientsController,

    DownloadedFilmsController,
    FavoriteFilmsController,
    FilmsController,

    DownloadingMediaController,

    TvSeriesesController,

    VideosController,
    DownloadedVideosController
];
