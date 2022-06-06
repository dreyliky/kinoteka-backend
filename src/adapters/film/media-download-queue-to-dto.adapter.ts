import { MediaDownloadQueue } from '@classes/core';
import { MediaDownloadQueueDto } from '@interfaces/core';

export function adaptMediaDownloadQueueToDto(model: MediaDownloadQueue): MediaDownloadQueueDto {
    return {
        data: model.data,
        isDownloading: model.isDownloading,
        downloadProgress: model.downloadProgress$.getValue()
    };
}