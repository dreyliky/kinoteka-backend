import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { Observable } from 'rxjs';
const Downloader = require('nodejs-file-downloader');

interface SplittedFilePath {
    readonly fileName: string;
    readonly directory: string;
}

@Injectable()
export class FileDownloaderService {
    public download(url: string, filePath: string): Observable<number> {
        const { directory, fileName } = this.splitFilePath(filePath);

        return new Observable((subscriber) => {
            const downloader = new Downloader({
                url,
                fileName,
                directory,
                maxAttempts: 999,
                cloneFiles: false,
                onProgress: (percents) => subscriber.next(+percents)
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

    private splitFilePath(filePath: string): SplittedFilePath {
        const lastSlashIndex = filePath.lastIndexOf('/');

        return {
            directory: filePath.slice(0, lastSlashIndex),
            fileName: filePath.slice(lastSlashIndex + 1)
        };
    }
}
