import { BookmarkEnum } from '@enums/core';
import { MediaBookmarksDictionary } from '@interfaces/core';
import { Injectable } from '@nestjs/common';
import { BookmarkedFilmsRepository } from '@repositories/film';

@Injectable()
export class BookmarkedFilmsService {
    constructor(
        private readonly bookmarkedFilmsRepository: BookmarkedFilmsRepository
    ) {}

    public getAsDictionary(): MediaBookmarksDictionary {
        return this.bookmarkedFilmsRepository.getAsDictionary();
    }

    public getAll(kinopoiskId: string): BookmarkEnum[] {
        return this.bookmarkedFilmsRepository.getAll(kinopoiskId);
    }

    public add(kinopoiskId: string, bookmark: BookmarkEnum): void {
        this.bookmarkedFilmsRepository.add(kinopoiskId, bookmark);
    }

    public remove(kinopoiskId: string, bookmark: BookmarkEnum): void {
        this.bookmarkedFilmsRepository.remove(kinopoiskId, bookmark);
    }

    public clear(kinopoiskId: string): void {
        this.bookmarkedFilmsRepository.clear(kinopoiskId);
    }
}
