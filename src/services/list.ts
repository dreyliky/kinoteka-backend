import { ClientCastService, ClientsService } from './client';
import {
    FileDownloaderService,
    OsService,
    SocketService,
    YoutubeService
} from './core';
import {
    DownloadedFilmsService,
    FavoriteFilmsService,
    FilmDownloaderService,
    FilmMediaPathService,
    FilmsService
} from './film';
import {
    MediaDownloadingCountSocketService,
    MediaDownloadingQueueService,
    MediaDownloadSocketService
} from './media';
import { SettingsService } from './settings';
import { TvSeriesService } from './tv-series';
import { DownloadedVideosService, VideoDownloaderService, VideoMediaPathService, VideosService } from './video';

export const SERVICES = [
    FileDownloaderService,
    OsService,
    SocketService,
    YoutubeService,

    ClientCastService,
    ClientsService,

    DownloadedFilmsService,
    FavoriteFilmsService,
    FilmDownloaderService,
    FilmMediaPathService,
    FilmsService,

    MediaDownloadSocketService,
    MediaDownloadingCountSocketService,
    MediaDownloadingQueueService,

    SettingsService,

    TvSeriesService,

    VideosService,
    VideoMediaPathService,
    VideoDownloaderService,
    DownloadedVideosService
];
