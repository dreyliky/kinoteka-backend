import { BookmarkEnum } from '@enums/core';
import { MediaBookmarksDictionary } from '@interfaces/core';
import { Injectable } from '@nestjs/common';
import { LocalStorage } from 'node-localstorage';

@Injectable()
export class BookmarkedVideosRepository {
    private readonly localStorage = new LocalStorage(global.__dbFolder);
    private readonly storageKey = `bookmarked-videos`;

    public getAsDictionary(): MediaBookmarksDictionary {
        try {
            return JSON.parse(this.localStorage.getItem(this.storageKey)) ?? {};
        } catch (error) {
            return {};
        }
    }

    public getAll(videoId: string): BookmarkEnum[] {
        const bookmarksDictionary = this.getAsDictionary();

        return this.getAllFromDictionary(bookmarksDictionary, videoId);
    }

    public add(videoId: string, bookmark: BookmarkEnum): void {
        const bookmarksDictionary = this.getAsDictionary();
        const bookmarks = this.getAllFromDictionary(bookmarksDictionary, videoId);

        if (!bookmarks.includes(bookmark)) {
            bookmarks.push(bookmark);
        }

        bookmarksDictionary[videoId] = bookmarks;

        this.localStorage.setItem(
            this.storageKey,
            JSON.stringify(bookmarksDictionary)
        );
    }

    public remove(videoId: string, bookmark: BookmarkEnum): void {
        const bookmarksDictionary = this.getAsDictionary();
        const bookmarks = this.getAllFromDictionary(bookmarksDictionary, videoId);
        const filteredBookmarks = bookmarks
            .filter((currentBookmark) => (currentBookmark !== bookmark));
        bookmarksDictionary[videoId] = filteredBookmarks;

        this.localStorage.setItem(
            this.storageKey,
            JSON.stringify(bookmarksDictionary)
        );
    }

    public clear(videoId: string): void {
        const bookmarksDictionary = this.getAsDictionary();
        delete bookmarksDictionary[videoId];

        this.localStorage.setItem(
            this.storageKey,
            JSON.stringify(bookmarksDictionary)
        );
    }

    public includes(videoId: string, bookmark: BookmarkEnum): boolean {
        const bookmarksDictionary = this.getAsDictionary();
        const bookmarks = this.getAllFromDictionary(bookmarksDictionary, videoId);

        return bookmarks
            .some((currentBookmark) => (currentBookmark === bookmark));
    }

    private getAllFromDictionary(dictionary: MediaBookmarksDictionary, videoId: string): BookmarkEnum[] {
        return (dictionary[videoId] ?? []);
    }
}
