import { FileDownloaderService } from '@core';
import { convertFilmIframeHtmlToFileUrl } from '@helpers';
import { ShortFilm } from '@interfaces';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { FilmsRepository } from '@repositories';
import { map, Observable, of } from 'rxjs';
import { catchError, concatAll, delayWhen, filter, finalize, switchMap, take } from 'rxjs/operators';

@Injectable()
export class FilmDownloaderService {
    private readonly downloadsPath = `${global.__basedir}/downloads`;

    constructor(
        private readonly http: HttpService,
        private readonly fileDownloader: FileDownloaderService,
        private readonly filmsRepository: FilmsRepository,
    ) {}

    public download(film: ShortFilm): Observable<number> {
        return this.http.get<string>(film.iframeSrc, { responseType: 'text' })
            .pipe(
                map((response) => convertFilmIframeHtmlToFileUrl(response.data)),
                delayWhen(() => this.fileDownloader.download(this.getFilmPreviewUrl(film), `${film.kinopoiskId}.jpg`)),
                switchMap((fileUrls: string[]) => this.getValidFilmUrl(fileUrls)),
                switchMap((fileUrl: string) => this.fileDownloader.download(fileUrl, `${film.kinopoiskId}.mp4`)),
                finalize(() => this.filmsRepository.save(film))
            );
    }

    public delete(kinopoiskId: string): boolean {
        this.filmsRepository.deleteById(kinopoiskId);
        this.fileDownloader.delete(this.getFilmFileFinalPath(kinopoiskId));
        this.fileDownloader.delete(this.getFilmPreviewFileFinalPath(kinopoiskId));

        return true;
    }

    private getValidFilmUrl(filmUrls: string[]): Observable<string> {
            const requests = filmUrls
                .map((url) => this.http.head(url).pipe(
                    catchError(() => of({ response: { status: 404 } } as any))
                ));
            return of(...requests)
                .pipe(
                    concatAll(),
                    filter((response) => (response.status === 200)),
                    take(1),
                    map((response) => response.request.res.responseUrl)
                );
    }

    private getFilmFileFinalPath(kinopoiskId: string): string {
        return `${this.downloadsPath}/${kinopoiskId}.mp4`;
    }

    private getFilmPreviewUrl(film: ShortFilm): string {
        return `https://st.kp.yandex.net/images/sm_film/${film.kinopoiskId}.jpg`;
    }

    private getFilmPreviewFileFinalPath(kinopoiskId: string): string {
        return `${this.downloadsPath}/${kinopoiskId}.jpg`;
    }
}
