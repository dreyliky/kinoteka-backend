import { FilmPlaylistEnum } from '@enums/film';
import { Controller, Get, Param } from '@nestjs/common';
import { PlaylistFilmsService } from '@services/film';

@Controller('playlist-films')
export class PlaylistFilmsController {
    constructor(
        private readonly playlistFilmsService: PlaylistFilmsService
    ) {}

    @Get(':playlistId')
    public getAll(@Param('playlistId') rawPlaylistId: string): unknown[] {
        const playlistId: FilmPlaylistEnum = +rawPlaylistId;
        
        return this.playlistFilmsService.getAll(playlistId);
    }
}
