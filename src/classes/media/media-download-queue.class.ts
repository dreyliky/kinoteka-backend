import { MediaTypeEnum } from '@enums/media';
import { BehaviorSubject, Subject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

export class MediaDownloadQueue<T = unknown, O = unknown> {
    public readonly id = uuidv4();
    public isDownloading: boolean = false;
    public readonly downloadProgress$ = new BehaviorSubject<number>(0);
    public readonly cancelDownload$ = new Subject<true>();
    public readonly endDownload$ = new Subject<true>();
    
    constructor(
        public readonly type: MediaTypeEnum,
        public readonly data: T,
        public readonly options: O
    ) {}

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
