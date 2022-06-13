import { adaptMediaDownloadQueueToDto } from '@adapters/media';
import { MediaDownloadQueueDto } from '@interfaces/media';
import { Controller, Delete, Get, Param } from '@nestjs/common';
import { MediaDownloadingQueueService } from '@services/media';

@Controller('downloading-media')
export class DownloadingMediaController {
    constructor(
        private readonly mediaDownloadingQueueService: MediaDownloadingQueueService
    ) {}

    @Get()
    public getAll(): MediaDownloadQueueDto[] {
        return this.mediaDownloadingQueueService.getAll()
            .map((mediaQueue) => adaptMediaDownloadQueueToDto(mediaQueue));
    }

    @Delete(':mediaQueueId')
    public delete(@Param('mediaQueueId') mediaQueueId: string): null {
        this.mediaDownloadingQueueService.remove(mediaQueueId);

        return null;
    }
}
