import { BookmarkEnum } from '@enums/core';
import { MediaBookmarksDictionary } from '@interfaces/core';
import { Injectable } from '@nestjs/common';
import { BookmarkedVideosRepository } from '@repositories/video';

@Injectable()
export class BookmarkedVideosService {
    constructor(
        private readonly bookmarkedVideosRepository: BookmarkedVideosRepository
    ) {}

    public getAsDictionary(): MediaBookmarksDictionary {
        return this.bookmarkedVideosRepository.getAsDictionary();
    }

    public getAll(videoId: string): BookmarkEnum[] {
        return this.bookmarkedVideosRepository.getAll(videoId);
    }

    public add(videoId: string, bookmark: BookmarkEnum): void {
        this.bookmarkedVideosRepository.add(videoId, bookmark);
    }

    public remove(videoId: string, bookmark: BookmarkEnum): void {
        this.bookmarkedVideosRepository.remove(videoId, bookmark);
    }

    public clear(videoId: string): void {
        this.bookmarkedVideosRepository.clear(videoId);
    }
}
