export type Movie = {
  id: number;
  tmdbId: number;
  imdbId: string;
  adult: boolean;
  backdropPath: string;
  belongsToCollection: {
    id: number;
    name: string;
    posterPath: string;
    backdropPath: string;
  };
  budget: number;
  categories: string[];
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  originCountry: string[];
  originalLanguage: string;
  originalTitle: string;
  overview: string;
  popularity: number;
  posterPath: string;
  productionCompanies: {
    id: number;
    logoPath: string;
    name: string;
    originCountry: string;
  }[];
  productionCountries: {
    iso3166_1: string;
    name: string;
  }[];
  releaseDate: string;
  revenue: number;
  runtime: number;
  spokenLanguages: {
    englishName: string;
    iso6391: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  voteAverage: number;
  voteCount: number;
  credits: {
    id: number;
    cast: {
      adult: boolean;
      gender: number;
      id: number;
      knownForDepartment: string;
      name: string;
      originalName: string;
      popularity: number;
      profilePath: string;
      castId: number;
      character: string;
      creditId: string;
      order: number;
    }[];
    crew: {
      adult: boolean;
      gender: number;
      id: number;
      knownForDepartment: string;
      name: string;
      originalName: string;
      popularity: number;
      profilePath: string;
      creditId: string;
      department: string;
      job: string;
    }[];
  };
}