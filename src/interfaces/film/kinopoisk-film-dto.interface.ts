export interface KinopoiskFilmDto {
    readonly externalId: ExternalId
    readonly logo: Logo
    readonly poster: Poster
    readonly backdrop: Backdrop
    readonly rating: Rating
    readonly votes: Votes
    readonly videos: Videos
    readonly budget: Budget
    readonly fees: Fees
    readonly distributors: Distributors
    readonly premiere: Premiere
    readonly images: Images
    readonly collections: any[]
    readonly updateDates: string[]
    readonly status: string
    readonly movieLength: number
    readonly productionCompanies: ProductionCompany[]
    readonly spokenLanguages: SpokenLanguage[]
    readonly id: number
    readonly type: string
    readonly name: string
    readonly description: string
    readonly slogan: string
    readonly year: number
    readonly facts: Fact[]
    readonly genres: Genre[]
    readonly countries: Country[]
    readonly seasonsInfo: any[]
    readonly persons: Person[]
    readonly lists: any[]
    readonly typeNumber: number
    readonly alternativeName: string
    readonly enName: any
    readonly names: Name[]
    readonly ageRating: number
    readonly ratingMpaa: string
    readonly updatedAt: string
    readonly similarMovies: SimilarMovy[]
    readonly imagesInfo: ImagesInfo
    readonly shortDescription: string
    readonly technology: Technology
    readonly ticketsOnSale: boolean
    readonly sequelsAndPrequels: SequelsAndPrequel[]
    readonly createDate: string
}
  
interface ExternalId {
    readonly _id: string
    readonly imdb: string
}

interface Logo {
    readonly _id: string
    readonly url: string
}

interface Poster {
    readonly _id: string
    readonly url: string
    readonly previewUrl: string
}

interface Backdrop {
    readonly _id: string
    readonly url: string
}

interface Rating {
    readonly _id: string
    readonly kp: number
    readonly imdb: number
    readonly filmCritics: number
    readonly russianFilmCritics: number
    readonly await: number
}

interface Votes {
    readonly _id: string
    readonly kp: number
    readonly imdb: number
    readonly filmCritics: number
    readonly russianFilmCritics: number
    readonly await: number
}

interface Videos {
    readonly _id: string
    readonly trailers: Trailer[]
    readonly teasers: any[]
}

interface Trailer {
    readonly _id: string
    readonly url: string
    readonly name: string
    readonly site: string
}

interface Budget {
    readonly _id: string
    readonly value: number
    readonly currency: string
}

interface Fees {
    readonly world: World
    readonly usa: Usa
    readonly _id: string
}

interface World {
    readonly _id: string
    readonly value: number
    readonly currency: string
}

interface Usa {
    readonly _id: string
    readonly value: number
    readonly currency: string
}

interface Distributors {
    readonly distributor: string
    readonly distributorRelease: string
}

interface Premiere {
    readonly _id: string
    readonly country: string
    readonly world: string
    readonly russia: string
    readonly cinema: string
    readonly dvd: string
    readonly bluray: string
}

interface Images {
    readonly framesCount: number
}

interface ProductionCompany {
    readonly name: string
    readonly url: string
    readonly previewUrl: string
}

interface SpokenLanguage {
    readonly name: string
    readonly nameEn: string
}

interface Fact {
    readonly value: string
    readonly type: string
    readonly spoiler: boolean
}

interface Genre {
    readonly name: string
}

interface Country {
    readonly name: string
}

interface Person {
    readonly id: number
    readonly name: string
    readonly enName: string
    readonly description?: string
    readonly enProfession: string
    readonly photo: string
}

interface Name {
    readonly name: string
}

interface SimilarMovy {
    readonly _id: string
    readonly id: number
    readonly name: string
    readonly enName: string
    readonly alternativeName: string
    readonly poster: Poster2
}

interface Poster2 {
    readonly _id: string
    readonly url: string
    readonly previewUrl: string
}

interface ImagesInfo {
    readonly _id: string
    readonly framesCount: number
}

interface Technology {
    readonly _id: string
    readonly hasImax: boolean
    readonly has3D: boolean
}

interface SequelsAndPrequel {
    readonly _id: string
    readonly id: number
    readonly name: string
    readonly enName: string
    readonly alternativeName: string
    readonly type: string
    readonly poster: Poster3
}

interface Poster3 {
    readonly _id: string
    readonly url: string
    readonly previewUrl: string
}
