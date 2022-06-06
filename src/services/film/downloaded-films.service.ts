import { DownloadedFilm } from '@interfaces/film';
import { Injectable } from '@nestjs/common';
import { FilmsRepository } from '@repositories/film';

@Injectable()
export class DownloadedFilmsService {
    constructor(
        private readonly filmsRepository: FilmsRepository
    ) {}

    public getAll(): DownloadedFilm[] {
        return this.filmsRepository.getAll();
    }
}
