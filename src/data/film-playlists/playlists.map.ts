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
            id: PlaylistEnum.Blockbusters,
            name: 'Блокбастери',
            imageUrl: 'blockbusters.png'
        },
        {
            id: PlaylistEnum.MustWatch,
            name: 'Варто подивитись',
            imageUrl: 'must-watch.png'
        },
        {
            id: PlaylistEnum.BestAdaptations,
            name: 'Найкращі екранізації',
            imageUrl: 'adaptations.png'
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
            id: PlaylistEnum.Comedies,
            name: 'Комедії',
            imageUrl: 'comedies.png'
        },
        {
            id: PlaylistEnum.Horrors,
            name: 'Жахи',
            imageUrl: 'horrors.png'
        },
        {
            id: PlaylistEnum.Fiction,
            name: 'Фантастика',
            imageUrl: 'fiction.png'
        },
        {
            id: PlaylistEnum.Thrillers,
            name: 'Трилери',
            imageUrl: 'thrillers.png'
        },
        {
            id: PlaylistEnum.Actions,
            name: 'Бойовики',
            imageUrl: 'actions.png'
        },
        {
            id: PlaylistEnum.Melodramas,
            name: 'Мелодрами',
            imageUrl: 'melodramas.png'
        },
        {
            id: PlaylistEnum.Detectives,
            name: 'Детективи',
            imageUrl: 'detectives.png'
        },
        {
            id: PlaylistEnum.Adventures,
            name: 'Пригоди',
            imageUrl: 'adventures.webp'
        },
        {
            id: PlaylistEnum.Fantasy,
            name: 'Фентезі',
            imageUrl: 'fantasy.png'
        },
        {
            id: PlaylistEnum.Military,
            name: 'Воєнні',
            imageUrl: 'military.png'
        },
        {
            id: PlaylistEnum.Historical,
            name: 'Історичні',
            imageUrl: 'historical.webp'
        },
        {
            id: PlaylistEnum.Dramas,
            name: 'Драми',
            imageUrl: 'dramas.png'
        },
        {
            id: PlaylistEnum.Crimes,
            name: 'Кримінал',
            imageUrl: 'crimes.webp'
        }
    ]],
    [PlaylistCategory.Thematic, [
        {
            id: PlaylistEnum.DigitalReleases,
            name: 'Цифрові релізи',
            imageUrl: 'digital-releases.jfif'
        },
        {
            id: PlaylistEnum.Marvel,
            name: 'Кіновсесвіт Marvel',
            imageUrl: 'marvel.jfif'
        },
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
    ]]
]);
