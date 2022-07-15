import { BookmarkedFilmsRepository, FavoriteFilmsRepository, FilmsRepository } from './film';
import { SettingsRepository } from './settings';
import { BookmarkedTvSeriesesRepository } from './tv-series';
import { BookmarkedVideosRepository, VideosRepository } from './video';

export const REPOSITORIES = [
    FilmsRepository,
    FavoriteFilmsRepository,
    BookmarkedFilmsRepository,

    SettingsRepository,

    BookmarkedTvSeriesesRepository,

    VideosRepository,
    BookmarkedVideosRepository
];
