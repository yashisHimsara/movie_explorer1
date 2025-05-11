export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  overview: string;
  genre_ids: number[];
}

export interface MovieDetails extends Movie {
  genres: { id: number; name: string }[];
  runtime: number;
  tagline: string;
  backdrop_path: string | null;
  budget: number;
  revenue: number;
  status: string;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  videos?: {
    results: {
      id: string;
      key: string;
      name: string;
      site: string;
      type: string;
    }[];
  };
  credits?: {
    cast: {
      id: number;
      name: string;
      character: string;
      profile_path: string | null;
    }[];
    crew: {
      id: number;
      name: string;
      job: string;
      profile_path: string | null;
    }[];
  };
}

export interface SearchResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface APIError {
  status_message: string;
  status_code: number;
}

export interface MovieFilters {
  year?: number;
  minRating?: number;
  genres?: number[];
}

export interface Genre {
  id: number;
  name: string;
}