import { ShortFilm } from '@interfaces/film';
import { Injectable } from '@nestjs/common';
import { FavoriteFilmsRepository } from '@repositories/film';

@Injectable()
export class FavoriteFilmsService {
    constructor(
        private readonly favoriteFilmsRepository: FavoriteFilmsRepository
    ) {}

    public getAll(): ShortFilm[] {
        return this.favoriteFilmsRepository.getAll();
    }

    public includes(kinopoiskId: string): boolean {
        return this.favoriteFilmsRepository.includes(kinopoiskId);
    }

    public add(film: ShortFilm): void {
        if (!this.includes(film.kinopoiskId)) {
            this.favoriteFilmsRepository.save(film);
        }
    }

    public remove(kinopoiskId: string): void {
        this.favoriteFilmsRepository.deleteById(kinopoiskId);
    }
}
