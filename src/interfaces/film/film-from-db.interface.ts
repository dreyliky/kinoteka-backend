export interface FilmFromDB {
    readonly id: number;
    readonly title: string;
    readonly kp_id: string;
    readonly imdb_id: string;
    readonly world_art_id: string;
    readonly type: string;
    readonly add: string;
    readonly orig_title: string;
    readonly year: string;
    readonly quality: string;
    readonly translations: string[];
    readonly seasons_count: string;
    readonly episodes_count: string;
    readonly episodes: string;
    readonly update: string;
    readonly iframe_src: string;
}
