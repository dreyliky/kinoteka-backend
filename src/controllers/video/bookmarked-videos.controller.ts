import { BookmarkEnum } from '@enums/core';
import { MediaBookmarksDictionary } from '@interfaces/core';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { BookmarkedVideosService } from '@services/video';

@Controller('bookmarked-videos')
export class BookmarkedVideosController {
    constructor(
        private readonly bookmarkedVideosService: BookmarkedVideosService
    ) {}

    @Get('dictionary')
    public getAsDictionary(): MediaBookmarksDictionary {
        return this.bookmarkedVideosService.getAsDictionary();
    }

    @Get(':videoId')
    public getAll(@Param('videoId') videoId: string): BookmarkEnum[] {
        return this.bookmarkedVideosService.getAll(videoId);
    }

    @Post(':videoId')
    public add(
        @Param('videoId') videoId: string,
        @Body('data') bookmark: BookmarkEnum
    ): void {
        this.bookmarkedVideosService.add(videoId, bookmark);
    }

    @Delete(':videoId/:bookmark')
    public delete(
        @Param('videoId') videoId: string,
        @Param('bookmark') rawBookmark: string
    ): void {
        const bookmark = (+rawBookmark as BookmarkEnum);

        this.bookmarkedVideosService.remove(videoId, bookmark);
    }
}
