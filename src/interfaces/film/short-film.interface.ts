import { FilmShortMedia } from './film-short-media.interface';

export interface ShortFilm {
    readonly title: string;
    readonly kinopoiskId: string;
    readonly year: string;
    readonly iframeSrc: string;
    readonly previewUrl: string;
    readonly media: FilmShortMedia[];
}
