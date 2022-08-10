import { FilmPlaylistEnum as Playlist } from '@enums/film';
import {
    BEST_ABOUT_APOCALYPSE_FILM_IDS,
    BEST_BASED_BY_COMICS_FILM_IDS,
    BEST_FOR_KIDS_FILM_IDS,
    BEST_OF_2021_YEAR_FILM_IDS,
    POPULAR_FILM_IDS,
    TOP_500_FILM_IDS
} from './best';
import {
    ABOUT_CARTOONS_FOR_KIDS_FILM_IDS,
    ABOUT_CATASTROPHE_FILM_IDS,
    ABOUT_COMEDIAN_ACTIONS_FILM_IDS,
    ABOUT_DANCE_FILM_IDS,
    ABOUT_FAMILY_COMEDIES_FILM_IDS,
    ABOUT_LOVE_FILM_IDS,
    ABOUT_PROGRAMMERS_FILM_IDS,
    ABOUT_ROMANTIC_COMEDIES_FILM_IDS,
    ABOUT_SCHOOL_FILM_IDS,
    ABOUT_SHARKS_FILM_IDS,
    ABOUT_SPACE_FILM_IDS,
    ABOUT_TEENAGERS_FILM_IDS,
    ABOUT_VAMPIRES_FILM_IDS,
    ABOUT_ZOMBIES_FILM_IDS
} from './genre';
import { DIGITAL_RELEASES_FILM_IDS } from './other';

export const FILM_PLAYLISTS_CONTENT_MAP = new Map<Playlist, string[]>([
    [Playlist.Top500, TOP_500_FILM_IDS],
    [Playlist.Popular, POPULAR_FILM_IDS],
    [Playlist.BestAboutApocalypse, BEST_ABOUT_APOCALYPSE_FILM_IDS],
    [Playlist.BestBasedByComics, BEST_BASED_BY_COMICS_FILM_IDS],
    [Playlist.BestForKids, BEST_FOR_KIDS_FILM_IDS],
    [Playlist.BestOf2021Year, BEST_OF_2021_YEAR_FILM_IDS],
    [Playlist.AboutCartoonsForKids, ABOUT_CARTOONS_FOR_KIDS_FILM_IDS],
    [Playlist.AboutCatastrophe, ABOUT_CATASTROPHE_FILM_IDS],
    [Playlist.AboutComedianActions, ABOUT_COMEDIAN_ACTIONS_FILM_IDS],
    [Playlist.AboutDance, ABOUT_DANCE_FILM_IDS],
    [Playlist.AboutFamilyComedies, ABOUT_FAMILY_COMEDIES_FILM_IDS],
    [Playlist.AboutLove, ABOUT_LOVE_FILM_IDS],
    [Playlist.AboutProgrammers, ABOUT_PROGRAMMERS_FILM_IDS],
    [Playlist.AboutRomanticComedies, ABOUT_ROMANTIC_COMEDIES_FILM_IDS],
    [Playlist.AboutSchool, ABOUT_SCHOOL_FILM_IDS],
    [Playlist.AboutSharks, ABOUT_SHARKS_FILM_IDS],
    [Playlist.AboutSpace, ABOUT_SPACE_FILM_IDS],
    [Playlist.AboutTeenagers, ABOUT_TEENAGERS_FILM_IDS],
    [Playlist.AboutVampires, ABOUT_VAMPIRES_FILM_IDS],
    [Playlist.AboutZombies, ABOUT_ZOMBIES_FILM_IDS],
    [Playlist.DigitalReleases, DIGITAL_RELEASES_FILM_IDS],
]);
