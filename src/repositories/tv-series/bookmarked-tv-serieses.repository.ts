import { BookmarkEnum } from '@enums/core';
import { MediaBookmarksDictionary } from '@interfaces/core';
import { Injectable } from '@nestjs/common';
import { LocalStorage } from 'node-localstorage';

@Injectable()
export class BookmarkedTvSeriesesRepository {
    private readonly localStorage = new LocalStorage(global.__dbFolder);
    private readonly storageKey = `bookmarked-tv-serieses`;

    public getAsDictionary(): MediaBookmarksDictionary {
        try {
            return JSON.parse(this.localStorage.getItem(this.storageKey)) ?? {};
        } catch (error) {
            return {};
        }
    }

    public getAll(kinopoiskId: string): BookmarkEnum[] {
        const bookmarksDictionary = this.getAsDictionary();

        return this.getAllFromDictionary(bookmarksDictionary, kinopoiskId);
    }

    public add(kinopoiskId: string, bookmark: BookmarkEnum): void {
        const bookmarksDictionary = this.getAsDictionary();
        const bookmarks = this.getAllFromDictionary(bookmarksDictionary, kinopoiskId);

        if (!bookmarks.includes(bookmark)) {
            bookmarks.push(bookmark);
        }

        bookmarksDictionary[kinopoiskId] = bookmarks;

        this.localStorage.setItem(
            this.storageKey,
            JSON.stringify(bookmarksDictionary)
        );
    }

    public remove(kinopoiskId: string, bookmark: BookmarkEnum): void {
        const bookmarksDictionary = this.getAsDictionary();
        const bookmarks = this.getAllFromDictionary(bookmarksDictionary, kinopoiskId);
        const filteredBookmarks = bookmarks
            .filter((currentBookmark) => (currentBookmark !== bookmark));
        bookmarksDictionary[kinopoiskId] = filteredBookmarks;

        if (!filteredBookmarks.length) {
            delete bookmarksDictionary[kinopoiskId];
        }

        this.localStorage.setItem(
            this.storageKey,
            JSON.stringify(bookmarksDictionary)
        );
    }

    public clear(kinopoiskId: string): void {
        const bookmarksDictionary = this.getAsDictionary();
        delete bookmarksDictionary[kinopoiskId];

        this.localStorage.setItem(
            this.storageKey,
            JSON.stringify(bookmarksDictionary)
        );
    }

    public includes(kinopoiskId: string, bookmark: BookmarkEnum): boolean {
        const bookmarksDictionary = this.getAsDictionary();
        const bookmarks = this.getAllFromDictionary(bookmarksDictionary, kinopoiskId);

        return bookmarks
            .some((currentBookmark) => (currentBookmark === bookmark));
    }

    private getAllFromDictionary(dictionary: MediaBookmarksDictionary, kinopoiskId: string): BookmarkEnum[] {
        return (dictionary[kinopoiskId] ?? []);
    }
}
