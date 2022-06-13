import { MediaDownloadQueue } from '@classes/media';
import { MediaTypeEnum } from '@enums/media';
import { Injectable } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class MediaDownloadingQueueState {
    public get onQueueUpdated$(): Observable<boolean> {
        return this._onQueueUpdated$.asObservable();
    }

    public get onMediaAdded$(): Observable<MediaDownloadQueue> {
        return this._onMediaAdded$.asObservable();
    }

    public get onMediaRemoved$(): Observable<MediaDownloadQueue> {
        return this._onMediaRemoved$.asObservable();
    }

    /** Key - MediaQueue.data */
    private readonly _data = new Map<unknown, MediaDownloadQueue>();
    private readonly queue: unknown[] = [];

    private readonly _onMediaAdded$ = new Subject<MediaDownloadQueue>();
    private readonly _onMediaRemoved$ = new Subject<MediaDownloadQueue>();
    private readonly _onQueueUpdated$ = new Subject<boolean>();

    public getFirst(): MediaDownloadQueue | null {
        if (this.queue[0]) {
            return this._data.get(this.queue[0]);
        }

        return null;
    }

    public getAll(): MediaDownloadQueue[] {
        return [...this._data.values()];
    }

    public getBySelector<T>(mediaSelector: (media: T) => boolean): MediaDownloadQueue {
        const media = this.queue.find(mediaSelector);

        return this._data.get(media);
    }

    public getById(id: string): MediaDownloadQueue {
        return [...this._data.values()]
            .find((media) => (media.id === id));
    }

    public add(type: MediaTypeEnum, media: unknown, downloadOptions: unknown): void {
        const mediaQueue = new MediaDownloadQueue(type, media, downloadOptions);

        this.queue.push(media);
        this._data.set(media, mediaQueue);
        this._onMediaAdded$.next(mediaQueue);
        this._onQueueUpdated$.next(true);
    }

    public addAsFirst(type: MediaTypeEnum, media: unknown, downloadOptions: unknown): void {
        const mediaQueue = new MediaDownloadQueue(type, media, downloadOptions);

        this.queue.unshift(media);
        this._data.set(media, mediaQueue);
        this._onMediaAdded$.next(mediaQueue);
        this._onQueueUpdated$.next(true);
    }

    public has(media: unknown): boolean {
        return this._data.has(media);
    }

    public markAsDownloading(media: unknown): void {
        const mediaQueue = this._data.get(media);
        mediaQueue.isDownloading = true;

        this._data.set(media, mediaQueue);
    }

    public remove(id: string): void {
        const mediaQueue = this.getById(id);
        const mediaQueueIndex = this.queue.indexOf(mediaQueue.data);

        mediaQueue.onDestroy();
        this.queue.splice(mediaQueueIndex, 1);
        this._data.delete(mediaQueue.data);
        this._onMediaRemoved$.next(mediaQueue);
        this._onQueueUpdated$.next(true);
    }

    public updateProgress(media: unknown, progress: number): void {
        const mediaQueue = this._data.get(media);
        mediaQueue.downloadProgress$.next(progress);
    }
}
