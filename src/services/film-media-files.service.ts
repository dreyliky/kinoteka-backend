import { adaptFilmToFilmMediaFiles } from '@adapters';
import { Film, FilmMediaFileMetadata } from '@interfaces';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FilmMediaFilesService {
    public getAll(film: Film): FilmMediaFileMetadata[] {
        return adaptFilmToFilmMediaFiles(film);
    }
}
