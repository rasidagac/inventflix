export interface Publishing {
  Actors: string;
  Awards: string;
  Country: string;
  Director: string;
  Genre: string;
  Language: string;
  Metascore: string;
  Plot: string;
  Poster: string;
  Rated: string;
  Ratings: Rating[];
  Released: string;
  Response: string;
  Runtime: string;
  Title: string;
  Type: Type;
  Writer: string;
  Year: string;
  imdbID: string;
  imdbRating: string;
  imdbVotes: string;
}

export interface Series extends Publishing {
  totalSeasons: string;
}

export interface Movie extends Publishing {
  BoxOffice: string;
  DVD: string;
  Production: string;
  Website: string;
}

export interface Rating {
  Source: string;
  Value: string;
}

export interface Omdb {
  Search: Search[];
  totalResults: string;
  Response: string;
}

export interface Search {
  Title: string;
  Year: string;
  imdbID: string;
  Type: Type;
  Poster: string;
}

export enum Type {
  Movie = "movie",
  Series = "series",
  Episode = "episode",
}
