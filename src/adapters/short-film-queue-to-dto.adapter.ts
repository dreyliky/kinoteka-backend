import { ShortFilmQueue } from '@classes';
import { ShortFilmQueueDto } from '@interfaces';

export function adaptShortFilmQueueToDto(model: ShortFilmQueue): ShortFilmQueueDto {
    return {
        data: model.data,
        isDownloading: model.isDownloading,
        downloadProgress: model.downloadProgress$.getValue()
    };
}