import { Injectable } from '@nestjs/common';

@Injectable()
export class FilmMediaPathService {
    private readonly filmsFolderName = 'films';

    public getMedia(kinopoiskId: string): string {
        return `${global.__downloadFolder}/${this.filmsFolderName}/${kinopoiskId}.mp4`;
    }

    public getPreview(kinopoiskId: string): string {
        return `${global.__downloadFolder}/${this.filmsFolderName}/${kinopoiskId}.jpg`;
    }
}
