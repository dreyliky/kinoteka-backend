import { ShortFilmQueue } from '@classes/core';
import { ShortFilmQueueDto } from '@interfaces/film';

export function adaptShortFilmQueueToDto(model: ShortFilmQueue): ShortFilmQueueDto {
    return {
        data: model.data,
        isDownloading: model.isDownloading,
        downloadProgress: model.downloadProgress$.getValue()
    };
}