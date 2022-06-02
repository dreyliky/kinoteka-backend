const interestedFormats = ['[360p]', '[1080p]', '[720p]', '[480p]'];
const mediaType = '.mp4';
const htmlPartFrom = '<input type="hidden" id="files" value="';
const htmlPartTo = '">';

export function convertFilmIframeHtmlToFileUrl(html: string): string {
    const htmlPartFromIndex = html.indexOf(htmlPartFrom);
    const htmlPartToIndex = html.indexOf(htmlPartTo, htmlPartFromIndex);
    const interestedHtml = html.slice(htmlPartFromIndex, htmlPartToIndex);
    let videoUrl: string;

    for (let format of interestedFormats) {
        const formatIndex = interestedHtml.indexOf(format);
        let urlStartIndex: number;
        let urlEndIndex: number;

        if (formatIndex !== -1) {
            urlStartIndex = (formatIndex + format.length);
            urlEndIndex = (interestedHtml.indexOf(mediaType, urlStartIndex) + mediaType.length);
            videoUrl = interestedHtml
                .slice(urlStartIndex, urlEndIndex)
                .replace(/\\/g, '')
                .slice(2);
            videoUrl = `http://${videoUrl}`;

            break;
        }
    }

    return (videoUrl ?? null);
}
