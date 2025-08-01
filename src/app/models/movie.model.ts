export type Genre =
    'Action' |
    'Adventure' |
    'Animation' |
    'Biography' |
    'Comedy' |
    'Crime' |
    'Documentary' |
    'Drama' |
    'Family' |
    'Fantasy' |
    'FilmNoir' |
    'History' |
    'Horror' |
    'Music' |
    'Mystery' |
    'Romance' |
    'SciFi' |
    'Sport' |
    'Thriller' |
    'War';
export type MovieType = 'TVShow' | 'Movie';

export interface Source {
    episode: number;
    url: string;
}

export interface Movie {
    id: string,
    title: string,
    genres: Genre[],
    type: MovieType,
    posterUrl: string,
    backgroundUrl: string,
    sources: Source[],
}
