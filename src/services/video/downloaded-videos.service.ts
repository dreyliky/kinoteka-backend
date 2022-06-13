import { DownloadedVideo } from '@interfaces/video';
import { Injectable } from '@nestjs/common';
import { VideosRepository } from '@repositories/video';

@Injectable()
export class DownloadedVideosService {
    constructor(
        private readonly videosRepository: VideosRepository
    ) {}

    public getAll(): DownloadedVideo[] {
        return this.videosRepository.getAll();
    }

    public get(id: string): DownloadedVideo {
        return this.videosRepository.get(id);
    }

    public includes(id: string): boolean {
        return this.videosRepository.includes(id);
    }
}
