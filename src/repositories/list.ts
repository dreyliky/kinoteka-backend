import { BookmarkedFilmsRepository, FavoriteFilmsRepository, FilmsRepository } from './film';
import { SettingsRepository } from './settings';
import { BookmarkedVideosRepository, VideosRepository } from './video';

export const REPOSITORIES = [
    FilmsRepository,
    FavoriteFilmsRepository,
    BookmarkedFilmsRepository,

    SettingsRepository,

    VideosRepository,
    BookmarkedVideosRepository
];
