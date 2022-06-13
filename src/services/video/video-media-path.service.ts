import { Injectable } from '@nestjs/common';

@Injectable()
export class VideoMediaPathService {
    private readonly filmsFolderName = 'videos';

    public getMedia(id: string): string {
        return `${global.__downloadFolder}/${this.filmsFolderName}/${id}.mp4`;
    }

    public getPreview(id: string): string {
        return `${global.__downloadFolder}/${this.filmsFolderName}/${id}.jpg`;
    }
}
