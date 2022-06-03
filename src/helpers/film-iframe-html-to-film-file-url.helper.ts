const interestedFormats = ['[1080p]', '[720p]', '[480p]', '[360p]'];
const mediaType = '.mp4';
const htmlPartFrom = '<input type="hidden" id="files" value="';
const htmlPartTo = '">';

export function convertFilmIframeHtmlToFileUrl(html: string): string[] {
    const htmlPartFromIndex = html.indexOf(htmlPartFrom);
    const htmlPartToIndex = html.indexOf(htmlPartTo, htmlPartFromIndex);
    const interestedHtml = html.slice(htmlPartFromIndex, htmlPartToIndex);
    let videoUrls: string[] = [];

    for (let format of interestedFormats) {
        let urlEndIndex: number = 0;
        let formatIndex = 0;

        while (interestedHtml.indexOf(format, urlEndIndex) !== -1) {
            formatIndex = interestedHtml.indexOf(format, urlEndIndex)
            let urlStartIndex: number;

            if (formatIndex !== -1) {
                urlStartIndex = (formatIndex + format.length);
                urlEndIndex = (interestedHtml.indexOf(mediaType, urlStartIndex) + mediaType.length);
                let videoUrl = interestedHtml
                    .slice(urlStartIndex, urlEndIndex)
                    .replace(/\\/g, '')
                    .slice(2);
                videoUrl = `http://${videoUrl}`;

                videoUrls.push(videoUrl);
            }
        }
    }

    return videoUrls;
}
