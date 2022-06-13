import { DownloadedVideo, ShortYoutubeVideo } from '@interfaces/video';

export function adaptShortVideoToDownloadedVideo(video: ShortYoutubeVideo): DownloadedVideo {
    return {
        id: video.id,
        title: video.title,
        authorName: video.authorName,
        duration: video.duration,
        quality: video.bestFormat.qualityLabel
    };
}
