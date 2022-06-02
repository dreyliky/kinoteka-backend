import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { Observable } from 'rxjs';
const Downloader = require('nodejs-file-downloader');

@Injectable()
export class FileDownloaderService {
    public download(url: string, fileName: string): Observable<unknown> {
        return new Observable((subscriber) => {
            const downloader = new Downloader({
                url,
                fileName,
                directory: `${global.__basedir}/downloads`
            });

            downloader.download()
                .then(() => {
                    subscriber.next();
                    subscriber.complete();
                })
                .catch(() => subscriber.error());
        });
    }

    public delete(filePath: string): void {
        fs.unlinkSync(filePath);
    }
}
