import { adaptShortFilmToDownloadedFilm } from '@adapters/film';
import { convertFilmIframeHtmlToFileUrl } from '@helpers/film';
import { FilmDownloaderOptions, ShortFilm } from '@interfaces/film';
import { MediaDownloader } from '@interfaces/media';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { FilmsRepository } from '@repositories/film';
import { FileDownloaderService } from '@services/core';
import { map, Observable } from 'rxjs';
import { finalize, switchMap } from 'rxjs/operators';
import { FilmMediaPathService } from './film-media-path.service';

@Injectable()
export class FilmDownloaderService implements MediaDownloader<ShortFilm, FilmDownloaderOptions> {
    constructor(
        private readonly http: HttpService,
        private readonly fileDownloader: FileDownloaderService,
        private readonly filmMediaPathService: FilmMediaPathService,
        private readonly filmsRepository: FilmsRepository
    ) {}

    public download(media: ShortFilm, { translationId }: FilmDownloaderOptions): Observable<number> {
        return this.downloadPreview(media)
            .pipe(
                switchMap(() => this.downloadMedia(media, translationId)),
                finalize(() => {
                    const downloadedFilm = adaptShortFilmToDownloadedFilm(media, translationId);

                    this.filmsRepository.save(downloadedFilm);
                })
            );
    }

    public deleteById(kinopoiskId: string): void {
        this.filmsRepository.deleteById(kinopoiskId);
        this.fileDownloader.delete(this.filmMediaPathService.getMedia(kinopoiskId));
        this.fileDownloader.delete(this.filmMediaPathService.getPreview(kinopoiskId));
    }

    public delete(media: ShortFilm): void {
        this.deleteById(media.kinopoiskId);
    }

    private downloadPreview(film: ShortFilm): Observable<number> {
        const previewUrl = this.getFilmPreviewUrl(film);
        const previewPath = this.filmMediaPathService.getPreview(film.kinopoiskId);

        return this.fileDownloader.download(previewUrl, previewPath);
    }

    private downloadMedia(film: ShortFilm, translationId: number): Observable<number> {
        return this.http.get<string>(film.iframeSrc, { responseType: 'text' })
            .pipe(
                map((response) => {
                    const media = film.media.find((media) => media.translationId === translationId);

                    return convertFilmIframeHtmlToFileUrl(response.data, media);
                }),
                switchMap((fileUrl) => {
                    const mediaPath = this.filmMediaPathService.getMedia(film.kinopoiskId);

                    return this.fileDownloader.download(fileUrl, mediaPath);
                })
            );
    }

    private getFilmPreviewUrl(film: ShortFilm): string {
        return `https://st.kp.yandex.net/images/sm_film/${film.kinopoiskId}.jpg`;
    }
}
