import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { Observable } from 'rxjs';
const Downloader = require('nodejs-file-downloader');

@Injectable()
export class FileDownloaderService {
    public download(url: string, fileName: string): Observable<number> {
        return new Observable((subscriber) => {
            const downloader = new Downloader({
                url,
                fileName,
                onProgress: (percents) => subscriber.next(+percents),
                directory: global.__downloadFolder,
            });

            downloader.download()
                .then(() => subscriber.complete())
                .catch(() => subscriber.error());

            return {
                unsubscribe: () => downloader.cancel()
            };
        });
    }

    public delete(filePath: string): void {
        try {
            fs.unlinkSync(filePath);
        } catch (error) {}
    }
}
