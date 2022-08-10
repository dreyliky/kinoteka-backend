import { FilmPlaylistCategoryEnum, FilmPlaylistEnum } from '@enums/film';
import { Playlist } from '@interfaces/playlist';
import { Controller, Get, Param } from '@nestjs/common';
import { FilmPlaylistsService } from '@services/film';

@Controller('film-playlists')
export class FilmPlaylistsController {
    constructor(
        private readonly playlistsService: FilmPlaylistsService
    ) {}

    @Get('/category/:categoryId')
    public getAll(@Param('categoryId') rawCategoryId: string): Playlist<FilmPlaylistEnum>[] {
        const categoryId: FilmPlaylistCategoryEnum = +rawCategoryId;
        
        return this.playlistsService.getAll(categoryId);
    }

    @Get(':playlistId')
    public getById(@Param('playlistId') rawPlaylistId: string): Playlist<FilmPlaylistEnum> {
        const playlistId: FilmPlaylistEnum = +rawPlaylistId;

        return this.playlistsService.getById(playlistId);
    }
}
