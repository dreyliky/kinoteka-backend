import { FilmShortMedia } from '@interfaces/film';

const mediaType = '.mp4';
const htmlPartFrom = '<input type="hidden" id="files" value="';
const htmlPartTo = '">';

interface TranslationsWithRawUrls {
    [translationId: string]: string;
}

export function convertFilmIframeHtmlToFileUrl(html: string, media: FilmShortMedia): string {
    const interestedFormat = `[${media.maxQuality}p]`;
    const htmlPartFromIndex = (html.indexOf(htmlPartFrom) + htmlPartFrom.length);
    const htmlPartToIndex = html.indexOf(htmlPartTo, htmlPartFromIndex);
    const interestedJson = html.slice(htmlPartFromIndex, htmlPartToIndex)
        .replace(/&quot;/g, '"');
    const medias: TranslationsWithRawUrls = JSON.parse(interestedJson);
    const rawUrl = medias[media.translationId];
    const mediaUrlFormatStartIndex = rawUrl.indexOf(interestedFormat);
    const mediaUrlStartIndex = (mediaUrlFormatStartIndex + interestedFormat.length);
    const mediaUrlEndIndex = (rawUrl.indexOf(mediaType, mediaUrlStartIndex) + mediaType.length);
    let videoUrl = rawUrl
        .slice(mediaUrlStartIndex, mediaUrlEndIndex)
        .replace(/\\/g, '')
        .slice(2);
    videoUrl = `http://${videoUrl}`;

    return videoUrl;
}
