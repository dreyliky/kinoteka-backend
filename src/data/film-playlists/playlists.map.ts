import {
    FilmPlaylistCategoryEnum as PlaylistCategory,
    FilmPlaylistEnum as PlaylistEnum
} from '@enums/film';
import { Playlist } from '@interfaces/playlist';

export const FILM_PLAYLISTS_MAP = new Map<PlaylistCategory, Playlist<PlaylistEnum>[]>([
    [PlaylistCategory.Best, [
        {
            id: PlaylistEnum.Top500,
            name: 'Топ 500 фільмів',
            imageUrl: 'top500.png'
        },
        {
            id: PlaylistEnum.Popular,
            name: 'Популярні фільми',
            imageUrl: 'popular.webp'
        },
        {
            id: PlaylistEnum.BestAboutApocalypse,
            name: 'Найкращі фільми про апокаліпсис',
            imageUrl: 'best-apocalypse.png'
        },
        {
            id: PlaylistEnum.BestBasedByComics,
            name: 'Найкращі фільми на основі коміксів',
            imageUrl: 'best-based-by-comics.png'
        },
        {
            id: PlaylistEnum.BestForKids,
            name: 'Найкращі фільми для дітей',
            imageUrl: 'best-for-kids.png'
        },
        {
            id: PlaylistEnum.BestOf2021Year,
            name: 'Найкращі фільми 2021 року',
            imageUrl: 'best-of-2021-year.png'
        }
    ]],
    [PlaylistCategory.Genres, [
        {
            id: PlaylistEnum.AboutCartoonsForKids,
            name: 'Мультфільми для дітей',
            imageUrl: 'about-cartoones-for-kids.png'
        },
        {
            id: PlaylistEnum.AboutCatastrophe,
            name: 'Фільми-катастрофи',
            imageUrl: 'about-catastrophe.png'
        },
        {
            id: PlaylistEnum.AboutComedianActions,
            name: 'Комедійні бойовики',
            imageUrl: 'about-comedian-actions.png'
        },
        {
            id: PlaylistEnum.AboutDance,
            name: 'Фільми про танці',
            imageUrl: 'about-dance.png'
        },
        {
            id: PlaylistEnum.AboutFamilyComedies,
            name: 'Сімейні комедії',
            imageUrl: 'about-family-comedies.png'
        },
        {
            id: PlaylistEnum.AboutLove,
            name: 'Фільми про любов',
            imageUrl: 'about-love.png'
        },
        {
            id: PlaylistEnum.AboutProgrammers,
            name: 'Фільми про програмістів',
            imageUrl: 'about-programmers.png'
        },
        {
            id: PlaylistEnum.AboutRomanticComedies,
            name: 'Романтичні комедії',
            imageUrl: 'about-romantic-comedies.png'
        },
        {
            id: PlaylistEnum.AboutSchool,
            name: 'Фільми про школу',
            imageUrl: 'about-school.png'
        },
        {
            id: PlaylistEnum.AboutTeenagers,
            name: 'Фільми про підлітків',
            imageUrl: 'about-teenagers.png'
        },
        {
            id: PlaylistEnum.AboutSharks,
            name: 'Фільми про акул',
            imageUrl: 'about-sharks.png'
        },
        {
            id: PlaylistEnum.AboutSpace,
            name: 'Фільми про космос',
            imageUrl: 'about-space.png'
        },
        {
            id: PlaylistEnum.AboutVampires,
            name: 'Фільми про вампірів',
            imageUrl: 'about-vampires.png'
        },
        {
            id: PlaylistEnum.AboutZombies,
            name: 'Фільми про зомбі',
            imageUrl: 'about-zombies.png'
        }
    ]],
    [PlaylistCategory.Other, [
        {
            id: PlaylistEnum.AboutZombies,
            name: 'Цифрові релізи',
            imageUrl: 'digital-releases.jfif'
        }
    ]]
]);
