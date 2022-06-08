export interface TvSeries {
    readonly id: number;
    readonly ru_title: string;
    readonly orig_title: string;
    readonly imdb_id: string;
    readonly kinopoisk_id: string;
    readonly season_count: number;
    readonly episode_count: number;
    readonly last_episode_id: number;
    readonly start_date: string | null;
    readonly end_date: string | null;
    readonly created: string | null;
    readonly updated: string | null;
    readonly blocked: number;
    readonly preview_iframe_src: string;
    readonly iframe_src: string;
    readonly iframe: string;
    readonly translations: Translation[];
    readonly episodes: TvSeriesEpisode[];
}

export interface TvSeriesEpisode {
    readonly id: number;
    readonly tv_series_id: number;
    readonly season_id: number;
    readonly num: string;
    readonly season_num: number;
    readonly ru_title: string;
    readonly orig_title: string;
    readonly imdb_id: string;
    readonly kinopoisk_id: string;
    readonly released: string;
    readonly ru_released: string;
    readonly created: string;
    readonly media: TvSeriesMedia[];
}

export interface TvSeriesMedia {
    readonly id: number;
    readonly translation_id: number;
    readonly content_id: number;
    readonly content_type: string;
    readonly tv_series_id: number;
    readonly source_quality: string;
    readonly max_quality: number;
    readonly path: string;
    readonly duration: number;
    readonly created: string | null;
    readonly accepted: string | null;
    readonly deleted_at: string | null;
    readonly blocked: number;
    readonly translation: Translation;
}

interface Translation {
    readonly id: number;
    readonly title: string;
    readonly priority: number;
    readonly episodes_count: number;
    readonly source_quality: string;
    readonly max_quality: number;
    readonly iframe_src: string;
    readonly iframe: string;
    readonly short_title: string;
    readonly smart_title: string;
    readonly shorter_title: string;
}
