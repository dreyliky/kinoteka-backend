import { DownloadedVideo } from '@interfaces/video';
import { Injectable } from '@nestjs/common';
import { LocalStorage } from 'node-localstorage';

@Injectable()
export class VideosRepository {
    private readonly localStorage = new LocalStorage(`${global.__dbFolder}`);
    private readonly storageKey = `videos`;

    public getAll(): DownloadedVideo[] {
        try {
            return JSON.parse(this.localStorage.getItem(this.storageKey)) ?? [];
        } catch (error) {
            return [];
        }
    }

    public get(id: string): DownloadedVideo {
        return this.getAll()
            .find((video) => video.id === id);
    }

    public save(video: DownloadedVideo): void {
        const videos = this.getAll();
        const newVideos = [video, ...videos];

        this.localStorage.setItem(
            this.storageKey,
            JSON.stringify(newVideos)
        );
    }

    public deleteById(id: string): void {
        const videos = this.getAll()
            .filter((currVideo) => currVideo.id !== id);

        this.localStorage.setItem(
            this.storageKey,
            JSON.stringify(videos)
        );
    }

    public includes(id: string): boolean {
        return this.getAll()
            .some((video) => video.id === id);
    }
}
