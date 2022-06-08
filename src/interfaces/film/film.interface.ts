export interface Film {
    readonly id: number;
    readonly ru_title: string;
    readonly orig_title: string;
    readonly imdb_id: string;
    readonly kinopoisk_id: string;
    readonly default_media_id?: any;
    readonly created: string;
    readonly released: string;
    readonly updated: string;
    readonly blocked: number;
    readonly media: Medium[];
    readonly preview_iframe_src: string;
    readonly iframe_src: string;
    readonly iframe: string;
    readonly translations: Translation[];
    readonly year: string;
    readonly content_type: string;
}

interface Quality {
    readonly id: any;
    readonly url: string;
    readonly resolution: number;
    readonly media_id: number;
}

interface Translation {
    readonly id: number;
    readonly title: string;
    readonly priority: number;
    readonly iframe_src: string;
    readonly iframe: string;
    readonly short_title: string;
    readonly smart_title: string;
    readonly shorter_title: string;
}

interface Medium {
    readonly id: number;
    readonly translation_id: number;
    readonly content_id: number;
    readonly content_type: string;
    readonly tv_series_id?: any;
    readonly source_quality: string;
    readonly max_quality: number;
    readonly path: string;
    readonly duration: number;
    readonly created: string;
    readonly accepted: string;
    readonly deleted_at?: any;
    readonly blocked: number;
    readonly qualities: Quality[];
    readonly translation: Translation;
}
