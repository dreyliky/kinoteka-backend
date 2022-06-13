import { Observable } from 'rxjs';

export interface MediaDownloader<T = unknown, O = unknown> {
    /** Returns progress in percents. And download success when complete. */
    download(media: T, downloaderOptions: O): Observable<number>;

    /** Deletes all downloaded content. */
    deleteById(mediaId: string): void;

    /** Deletes all downloaded content. */
    delete(media: T): void;
}
