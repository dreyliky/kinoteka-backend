import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import * as fs from 'fs';
import { Observable, switchMap, tap } from 'rxjs';

@Injectable()
export class FileDownloaderService {
    private readonly config: AxiosRequestConfig = {
        responseType: 'stream',
        timeout: 999999999,
        maxContentLength: 999999999,
        maxRedirects: 999999999,
        maxBodyLength: 999999999,
    };

    constructor(
        private readonly http: HttpService
    ) {}

    public download(url: string, filePath: string): Observable<unknown> {
        const file = fs.createWriteStream(filePath);

        return this.http.get(url, this.config)
            .pipe(
                tap((response) => response.data.pipe(file)),
                switchMap((response: AxiosResponse<any>) => {
                    return new Observable((subscriber) => {
                        response.data.on('end', () => {
                            subscriber.next();
                            subscriber.complete();
                        });

                        response.data.on('error', (error) => {
                            subscriber.error(error);
                        });
                    })
                })
            );
    }

    public delete(filePath: string): void {
        fs.unlinkSync(filePath);
    }
}
