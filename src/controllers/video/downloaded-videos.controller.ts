import { DownloadedVideo } from '@interfaces/video';
import { Controller, Delete, Get, Param, Response } from '@nestjs/common';
import { DownloadedVideosService, VideoDownloaderService, VideoMediaPathService } from '@services/video';

@Controller('downloaded-videos')
export class DownloadedVideosController {
    constructor(
        private readonly downloadedVideosService: DownloadedVideosService,
        private readonly videoDownloaderService: VideoDownloaderService,
        private readonly videoMediaPathService: VideoMediaPathService,
    ) {}

    @Get()
    public getAll(): DownloadedVideo[] {
        return this.downloadedVideosService.getAll();
    }

    @Get(':id')
    public get(@Param('id') id: string): DownloadedVideo {
        return this.downloadedVideosService.get(id);
    }

    @Get(':id/preview')
    public getPreview(@Param('id') id: string, @Response() response): void {
        const filePath = this.videoMediaPathService.getPreview(id);

        response.sendFile(filePath);
    }

    @Get(':id/media')
    public getMedia(@Param('id') id: string, @Response() response): void {
        const filePath = this.videoMediaPathService.getMedia(id);
        
        response.sendFile(filePath);
    }

    @Delete(':id')
    public delete(@Param('id') id: string): null {
        this.videoDownloaderService.deleteById(id);

        return null;
    }
}
