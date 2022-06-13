import { ShortVideoFormat } from './short-video-format.interface';

export interface ShortYoutubeVideo {
    readonly id: string;
    readonly title: string;
    readonly description: string;
    readonly duration: number;
    readonly authorName: string;
    readonly previewUrl: string;
    readonly bestFormat: ShortVideoFormat;
}
