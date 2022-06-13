import { FavoriteFilmsRepository, FilmsRepository } from './film';
import { SettingsRepository } from './settings';
import { VideosRepository } from './video';

export const REPOSITORIES = [
    FilmsRepository,
    FavoriteFilmsRepository,
    SettingsRepository,
    VideosRepository
];
