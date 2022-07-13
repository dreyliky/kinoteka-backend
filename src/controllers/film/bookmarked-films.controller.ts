import { BookmarkEnum } from '@enums/core';
import { MediaBookmarksDictionary } from '@interfaces/core';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { BookmarkedFilmsService } from '@services/film';

@Controller('bookmarked-films')
export class BookmarkedFilmsController {
    constructor(
        private readonly bookmarkedFilmsService: BookmarkedFilmsService
    ) {}

    @Get('dictionary')
    public getAsDictionary(): MediaBookmarksDictionary {
        return this.bookmarkedFilmsService.getAsDictionary();
    }

    @Get(':kinopoiskId')
    public getAll(@Param('kinopoiskId') kinopoiskId: string): BookmarkEnum[] {
        return this.bookmarkedFilmsService.getAll(kinopoiskId);
    }

    @Post(':kinopoiskId')
    public add(
        @Param('kinopoiskId') kinopoiskId: string,
        @Body('data') bookmark: BookmarkEnum
    ): void {
        this.bookmarkedFilmsService.add(kinopoiskId, bookmark);
    }

    @Delete(':kinopoiskId/:bookmark')
    public delete(
        @Param('kinopoiskId') kinopoiskId: string,
        @Param('bookmark') rawBookmark: string
    ): void {
        const bookmark = (+rawBookmark as BookmarkEnum);

        this.bookmarkedFilmsService.remove(kinopoiskId, bookmark);
    }
}
