import { MediaTypeEnum } from '@enums/media';

export interface MediaProgressDto<O = unknown> {
    readonly id: string;
    readonly mediaType: MediaTypeEnum;
    readonly downloadOptions: O;
    readonly downloadProgress: number;
}
