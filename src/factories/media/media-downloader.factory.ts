import { MediaTypeEnum } from '@enums/media';
import { MediaDownloader } from '@interfaces/media';
import { Injectable } from '@nestjs/common';
import { FilmDownloaderService } from '@services/film';
import { VideoDownloaderService } from '@services/video';

@Injectable()
export class MediaDownloaderFactory {
    private readonly downloaderMap = new Map<MediaTypeEnum, MediaDownloader>()
        .set(MediaTypeEnum.Film, this.filmDownloader)
        .set(MediaTypeEnum.Video, this.videoDownloader);

    constructor(
        private readonly filmDownloader: FilmDownloaderService,
        private readonly videoDownloader: VideoDownloaderService
    ) {}

    public get(mediaType: MediaTypeEnum): MediaDownloader {
        return this.downloaderMap.get(mediaType);
    }
}
