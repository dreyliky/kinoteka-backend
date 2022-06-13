import { MediaTypeEnum } from '@enums/media';

export interface MediaDownloadQueueDto<T = unknown, O = unknown> {
    readonly id: string;
    readonly data: T;
    readonly type: MediaTypeEnum;
    readonly downloaderOptions: O;
    readonly isDownloading: boolean;
    readonly downloadProgress: number;
}
