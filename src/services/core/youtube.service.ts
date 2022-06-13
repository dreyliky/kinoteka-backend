import { Injectable } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import * as ytdl from 'ytdl-core';

@Injectable()
export class YoutubeService {
    public getInfo(url: string, options?: ytdl.getInfoOptions): Observable<ytdl.videoInfo> {
        return from(ytdl.getInfo(url, options));
    }
}
