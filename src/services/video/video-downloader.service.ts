import { adaptShortVideoToDownloadedVideo } from '@adapters/video';
import { MediaDownloader } from '@interfaces/media';
import { ShortYoutubeVideo, VideoDownloaderOptions } from '@interfaces/video';
import { Injectable } from '@nestjs/common';
import { VideosRepository } from '@repositories/video';
import { FileDownloaderService } from '@services/core';
import { finalize, Observable, switchMap } from 'rxjs';
import { VideoMediaPathService } from './video-media-path.service';

@Injectable()
export class VideoDownloaderService implements MediaDownloader {
    constructor(
        private readonly fileDownloader: FileDownloaderService,
        private readonly videoMediaPathService: VideoMediaPathService,
        private readonly videosRepository: VideosRepository
    ) {}

    public download(video: ShortYoutubeVideo, downloaderOptions: VideoDownloaderOptions): Observable<number> {
        return this.downloadPreview(video)
            .pipe(
                switchMap(() => this.downloadMedia(video)),
                finalize(() => {
                    const downloadedVideo = adaptShortVideoToDownloadedVideo(video);

                    this.videosRepository.save(downloadedVideo);
                })
            );
    }

    public deleteById(id: string): void {
        this.videosRepository.deleteById(id);
        this.fileDownloader.delete(this.videoMediaPathService.getMedia(id));
        this.fileDownloader.delete(this.videoMediaPathService.getPreview(id));
    }

    public delete(video: ShortYoutubeVideo): void {
        this.deleteById(video.id);
    }

    private downloadPreview(video: ShortYoutubeVideo): Observable<number> {
        const previewPath = this.videoMediaPathService.getPreview(video.id);

        return this.fileDownloader.download(video.previewUrl, previewPath);
    }

    private downloadMedia(video: ShortYoutubeVideo): Observable<number> {
        const mediaPath = this.videoMediaPathService.getMedia(video.id);

        return this.fileDownloader.download(video.bestFormat.url, mediaPath);
    }
}
