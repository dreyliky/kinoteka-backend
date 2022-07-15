import { BookmarkEnum } from '@enums/core';
import { MediaBookmarksDictionary } from '@interfaces/core';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { BookmarkedTvSeriesesService } from '@services/tv-series';

@Controller('bookmarked-tv-serieses')
export class BookmarkedTvSeriesesController {
    constructor(
        private readonly bookmarkedTvSeriesService: BookmarkedTvSeriesesService
    ) {}

    @Get('dictionary')
    public getAsDictionary(): MediaBookmarksDictionary {
        return this.bookmarkedTvSeriesService.getAsDictionary();
    }

    @Get(':kinopoiskId')
    public getAll(@Param('kinopoiskId') kinopoiskId: string): BookmarkEnum[] {
        return this.bookmarkedTvSeriesService.getAll(kinopoiskId);
    }

    @Post(':kinopoiskId')
    public add(
        @Param('kinopoiskId') kinopoiskId: string,
        @Body('data') bookmark: BookmarkEnum
    ): void {
        this.bookmarkedTvSeriesService.add(kinopoiskId, bookmark);
    }

    @Delete(':kinopoiskId/:bookmark')
    public delete(
        @Param('kinopoiskId') kinopoiskId: string,
        @Param('bookmark') rawBookmark: string
    ): void {
        const bookmark = (+rawBookmark as BookmarkEnum);

        this.bookmarkedTvSeriesService.remove(kinopoiskId, bookmark);
    }
}
