import { ShortYoutubeVideo } from '@interfaces/video';
import ytdl from 'ytdl-core';
import { adaptYoutubeVideoFormatsToBestFormat } from './youtube-video-formats-to-best-format.adapter';

export function adaptYoutubeVideoResponseToShortVideo(response: ytdl.videoInfo): ShortYoutubeVideo {
    return {
        id: response.videoDetails.videoId,
        title: response.videoDetails.title,
        description: response.videoDetails.description,
        duration: +response.videoDetails.lengthSeconds,
        authorName: response.videoDetails.author.name,
        previewUrl: response.videoDetails.thumbnails[response.videoDetails.thumbnails.length - 1].url,
        bestFormat: adaptYoutubeVideoFormatsToBestFormat(response)
    };
}
