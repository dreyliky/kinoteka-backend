import { ShortFilm } from '@interfaces/film';
import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { FavoriteFilmsService, FilmsService } from '@services/film';
import { Observable, tap } from 'rxjs';

@Controller('films/favorites')
export class FavoriteFilmsController {
    constructor(
        private readonly favoriteFilmsService: FavoriteFilmsService,
        private readonly filmsService: FilmsService
    ) {}

    @Get()
    public getAll(): ShortFilm[] {
        return this.favoriteFilmsService.getAll();
    }

    @Get(':kinopoiskId/state')
    public checkState(@Param('kinopoiskId') kinopoiskId: string): boolean {
        return this.favoriteFilmsService.includes(kinopoiskId);
    }

    @Post(':kinopoiskId')
    public add(@Param('kinopoiskId') kinopoiskId: string): Observable<unknown> {
        return this.filmsService.getShort(kinopoiskId)
            .pipe(
                tap((film: ShortFilm) => this.favoriteFilmsService.add(film))
            );
    }

    @Delete(':kinopoiskId')
    public remove(@Param('kinopoiskId') kinopoiskId: string): unknown {
        this.favoriteFilmsService.remove(kinopoiskId);

        return null;
    }
}
