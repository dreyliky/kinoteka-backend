import { FileDownloaderService } from '@core';
import { convertFilmIframeHtmlToFileUrl } from '@helpers';
import { ShortFilm } from '@interfaces';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { FilmsRepository } from '@repositories';
import { map, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { DownloadingFilmsState } from 'src/states';

@Injectable()
export class FilmDownloaderService {
    private readonly downloadsPath = `${global.__basedir}/downloads`;

    constructor(
        private readonly http: HttpService,
        private readonly fileDownloader: FileDownloaderService,
        private readonly filmsRepository: FilmsRepository,
        private readonly downloadingFilmsState: DownloadingFilmsState
    ) {}

    public download(film: ShortFilm): Observable<unknown> {
        return this.http.get<string>(film.iframeSrc, { responseType: 'text' })
            .pipe(
                map((response) => convertFilmIframeHtmlToFileUrl(response.data)),
                tap((fileUrl: string) => this.processFilmDownloadInBackground(fileUrl, film))
            );
    }

    public delete(kinopoiskId: string): boolean {
        this.fileDownloader.delete(this.getFilmFileFinalPath(kinopoiskId));
        this.fileDownloader.delete(this.getFilmPreviewFileFinalPath(kinopoiskId));
        this.filmsRepository.deleteById(kinopoiskId);

        return true;
    }

    private processFilmDownloadInBackground(fileUrl: string, film: ShortFilm): void {
        this.downloadingFilmsState.add(film.kinopoiskId);
        
        this.fileDownloader.download(fileUrl, this.getFilmFileFinalPath(film.kinopoiskId))
            .pipe(
                switchMap(() => this.fileDownloader.download(this.getFilmPreviewUrl(film), this.getFilmPreviewFileFinalPath(film.kinopoiskId))),
                tap(() => this.filmsRepository.save(film)),
                tap(() => this.downloadingFilmsState.remove(film.kinopoiskId))
            )
            .subscribe();
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
