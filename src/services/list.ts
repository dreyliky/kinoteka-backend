import { ClientCastService, ClientsService } from './client';
import {
    FileDownloaderService,
    SocketService,
    YoutubeService
} from './core';
import {
    BookmarkedFilmsService,
    DownloadedFilmsService,
    FavoriteFilmsService,
    FilmDownloaderService,
    FilmMediaPathService,
    FilmPlaylistCategoriesService,
    FilmPlaylistsService,
    FilmsService,
    PlaylistFilmsService
} from './film';
import {
    MediaDownloadingCountSocketService,
    MediaDownloadingQueueService,
    MediaDownloadSocketService
} from './media';
import { SettingsService } from './settings';
import { BookmarkedTvSeriesesService, TvSeriesService } from './tv-series';
import {
    BookmarkedVideosService,
    DownloadedVideosService,
    VideoDownloaderService,
    VideoMediaPathService,
    VideosService
} from './video';

export const SERVICES = [
    FileDownloaderService,
    SocketService,
    YoutubeService,

    ClientCastService,
    ClientsService,

    DownloadedFilmsService,
    FavoriteFilmsService,
    FilmDownloaderService,
    FilmMediaPathService,
    FilmsService,
    BookmarkedFilmsService,
    FilmPlaylistsService,
    FilmPlaylistCategoriesService,
    PlaylistFilmsService,

    MediaDownloadSocketService,
    MediaDownloadingCountSocketService,
    MediaDownloadingQueueService,

    SettingsService,

    TvSeriesService,
    BookmarkedTvSeriesesService,

    VideosService,
    VideoMediaPathService,
    VideoDownloaderService,
    DownloadedVideosService,
    BookmarkedVideosService
];
