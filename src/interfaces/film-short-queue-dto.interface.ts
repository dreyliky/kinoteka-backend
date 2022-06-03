import { ShortFilm } from './film-short.interface';

export interface ShortFilmQueueDto {
    readonly data: ShortFilm;
    readonly isDownloading: boolean;
    readonly downloadProgress: number;
}
