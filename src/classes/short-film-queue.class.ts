import { ShortFilm } from '@interfaces';
import { BehaviorSubject, Subject } from 'rxjs';

export class ShortFilmQueue {
    public isDownloading: boolean = false;
    public readonly downloadProgress$ = new BehaviorSubject<number>(0);
    public readonly cancelDownload$ = new Subject<true>();
    public readonly endDownload$ = new Subject<true>();
    
    constructor(public readonly data: ShortFilm) {}

    public onDestroy(): void {
        if (this.downloadProgress$.value === 100) {
            this.endDownload$.next(true);
        } else {
            this.cancelDownload$.next(true);
        }

        this.cancelDownload$.complete();
        this.endDownload$.complete();
        this.downloadProgress$.complete();
    }
}
