
export interface MediaDownloadQueueDto<T = unknown> {
    readonly data: T;
    readonly isDownloading: boolean;
    readonly downloadProgress: number;
}
