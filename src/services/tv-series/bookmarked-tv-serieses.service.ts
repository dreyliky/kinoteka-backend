import { BookmarkEnum } from '@enums/core';
import { MediaBookmarksDictionary } from '@interfaces/core';
import { Injectable } from '@nestjs/common';
import { BookmarkedTvSeriesesRepository } from '@repositories/tv-series';

@Injectable()
export class BookmarkedTvSeriesesService {
    constructor(
        private readonly bookmarkedTvSeriesesRepository: BookmarkedTvSeriesesRepository
    ) {}

    public getAsDictionary(): MediaBookmarksDictionary {
        return this.bookmarkedTvSeriesesRepository.getAsDictionary();
    }

    public getAll(kinopoiskId: string): BookmarkEnum[] {
        return this.bookmarkedTvSeriesesRepository.getAll(kinopoiskId);
    }

    public add(kinopoiskId: string, bookmark: BookmarkEnum): void {
        this.bookmarkedTvSeriesesRepository.add(kinopoiskId, bookmark);
    }

    public remove(kinopoiskId: string, bookmark: BookmarkEnum): void {
        this.bookmarkedTvSeriesesRepository.remove(kinopoiskId, bookmark);
    }

    public clear(kinopoiskId: string): void {
        this.bookmarkedTvSeriesesRepository.clear(kinopoiskId);
    }
}
