export interface Film {
    id: number;
    ru_title: string;
    orig_title: string;
    imdb_id: string;
    kinopoisk_id: string;
    default_media_id?: any;
    created: string;
    released: string;
    updated: string;
    blocked: number;
    media: Medium[];
    preview_iframe_src: string;
    iframe_src: string;
        iframe: string;
        translations: Translation2[];
        year: string;
        content_type: string;
}

interface Quality {
    id: any;
    url: string;
    resolution: number;
    media_id: number;
}

interface Translation {
    id: number;
    title: string;
    priority: number;
    iframe_src: string;
    iframe: string;
    short_title: string;
    smart_title: string;
    shorter_title: string;
}

interface Medium {
    id: number;
    translation_id: number;
    content_id: number;
    content_type: string;
    tv_series_id?: any;
    source_quality: string;
    max_quality: number;
    path: string;
    duration: number;
    created: string;
    accepted: string;
    deleted_at?: any;
    blocked: number;
    qualities: Quality[];
    translation: Translation;
}

interface Translation2 {
    id: number;
    title: string;
    priority: number;
    iframe_src: string;
    iframe: string;
    short_title: string;
    smart_title: string;
    shorter_title: string;
}
