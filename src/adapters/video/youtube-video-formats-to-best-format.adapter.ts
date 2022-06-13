import { ShortVideoFormat } from '@interfaces/video';
import ytdl from 'ytdl-core';

export function adaptYoutubeVideoFormatsToBestFormat(videoInfo: ytdl.videoInfo): ShortVideoFormat {
    const format = (videoInfo.player_response.streamingData.formats as ytdl.videoFormat[])
        .sort((f1, f2) => (parseInt(f2.qualityLabel) - parseInt(f1.qualityLabel)))
        .find((format) => ((format.audioChannels === 2) && (format.mimeType.includes('mp4'))));

    return {
        url: format.url,
        qualityLabel: format.qualityLabel,
        fps: format.fps
    };
}
