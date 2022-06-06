import { DownloadedFilm } from '@interfaces/film';
import { Injectable } from '@nestjs/common';
import { LocalStorage } from 'node-localstorage';

@Injectable()
export class FilmsRepository {
    private readonly localStorage = new LocalStorage(`${global.__dbFolder}`);
    private readonly storageKey = `films`;

    public getAll(): DownloadedFilm[] {
        try {
            return JSON.parse(this.localStorage.getItem(this.storageKey)) ?? [];
        } catch (error) {
            return [];
        }
    }

    public get(kinopoiskId: string): DownloadedFilm {
        return this.getAll()
            .find((film) => film.kinopoiskId === kinopoiskId);
    }

    public save(film: DownloadedFilm): void {
        const films = this.getAll();
        const newFilms = [film, ...films];

        this.localStorage.setItem(
            this.storageKey,
            JSON.stringify(newFilms)
        );
    }

    public deleteById(kinopoiskId: string): void {
        const films = this.getAll()
            .filter((currFilm) => currFilm.kinopoiskId !== kinopoiskId);

        this.localStorage.setItem(
            this.storageKey,
            JSON.stringify(films)
        );
    }

    public includes(kinopoiskId: string): boolean {
        return this.getAll()
            .some((film) => film.kinopoiskId === kinopoiskId);
    }
}
