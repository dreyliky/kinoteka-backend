import { MediaDownloadQueue } from '@classes/media';
import { MediaDownloadQueueDto } from '@interfaces/media';

export function adaptMediaDownloadQueueToDto(model: MediaDownloadQueue): MediaDownloadQueueDto {
    return {
        id: model.id,
        type: model.type,
        data: model.data,
        downloaderOptions: model.options,
        isDownloading: model.isDownloading,
        downloadProgress: model.downloadProgress$.getValue()
    };
}
