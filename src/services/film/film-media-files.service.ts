import { adaptFilmToFilmMediaFiles } from '@adapters/film';
import { Film, FilmMediaFileMetadata } from '@interfaces/film';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FilmMediaFilesService {
    public getAll(film: Film): FilmMediaFileMetadata[] {
        return adaptFilmToFilmMediaFiles(film);
    }
}
