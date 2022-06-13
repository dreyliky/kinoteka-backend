import { adaptYoutubeVideoResponseToShortVideo } from '@adapters/video';
import { MediaTypeEnum } from '@enums/media';
import { VideoDownloadStatusEnum } from '@enums/video';
import { ShortYoutubeVideo, VideoDownloaderOptions } from '@interfaces/video';
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { YoutubeService } from '@services/core';
import { MediaDownloadingQueueService } from '@services/media';
import { DownloadedVideosService } from '@services/video';
import { map, Observable, tap } from 'rxjs';

@Controller('videos')
export class VideosController {
    constructor(
        private readonly youtubeService: YoutubeService,
        private readonly downloadedVideosService: DownloadedVideosService,
        private readonly mediaDownloadingQueueService: MediaDownloadingQueueService
    ) {}

    @Get('info')
    public getInfo(
        @Query('url') youtubeVideoUrl: string
    ): Observable<ShortYoutubeVideo> {
        return this.youtubeService.getInfo(youtubeVideoUrl)
            .pipe(
                map((video) => adaptYoutubeVideoResponseToShortVideo(video))
            );
    }

    @Get(':id/status')
    public getStatus(@Param('id') id: string): VideoDownloadStatusEnum {
        const mediaInDownloadQueue = this.mediaDownloadingQueueService
            .getBySelector<ShortYoutubeVideo>((media) => (media.id === id));

        if (this.downloadedVideosService.includes(id)) {
            return VideoDownloadStatusEnum.Downloaded;
        } else if (mediaInDownloadQueue) {
            return VideoDownloadStatusEnum.Downloading;
        }

        return VideoDownloadStatusEnum.Undownloaded;
    }

    @Post('download')
    public download(
        @Body('url') youtubeVideoUrl: string
    ): Observable<null> {
        return this.youtubeService.getInfo(youtubeVideoUrl)
            .pipe(
                map((videoInfo) => adaptYoutubeVideoResponseToShortVideo(videoInfo)),
                tap((video) => {
                    const downloadOptions: VideoDownloaderOptions = {
                        url: youtubeVideoUrl
                    };

                    this.mediaDownloadingQueueService.add(MediaTypeEnum.Video, video, downloadOptions);
                }),
                map(() => null)
            );
    }
}
