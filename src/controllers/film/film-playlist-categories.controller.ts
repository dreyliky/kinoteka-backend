import { FilmPlaylistCategoryEnum } from '@enums/film';
import { PlaylistCategory } from '@interfaces/playlist';
import { Controller, Get } from '@nestjs/common';
import { FilmPlaylistCategoriesService } from '@services/film';

@Controller('film-playlist-categories')
export class FilmPlaylistsCategoriesController {
    constructor(
        private readonly playlistCategoriesService: FilmPlaylistCategoriesService
    ) {}

    @Get()
    public getAll(): PlaylistCategory<FilmPlaylistCategoryEnum>[] {
        return this.playlistCategoriesService.getAll();
    }
}
