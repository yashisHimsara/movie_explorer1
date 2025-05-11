import axios, { AxiosError } from 'axios';
import { Movie, MovieDetails, SearchResponse, APIError, Genre, MovieFilters } from '../types';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: '3315ffd7b959f678afba733c69669eb1',
    language: 'en-US',
  },
});

export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';
export const POSTER_SIZES = {
  small: 'w185',
  medium: 'w342',
  large: 'w500',
  original: 'original',
};
export const BACKDROP_SIZES = {
  small: 'w300',
  medium: 'w780',
  large: 'w1280',
  original: 'original',
};

const handleError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const apiError = error.response?.data as APIError;
    throw new Error(apiError?.status_message || 'An unexpected error occurred');
  }
  throw error;
};

const formatMovieData = (movie: any): Movie => ({
  id: movie.id,
  title: movie.title,
  poster_path: movie.poster_path,
  release_date: movie.release_date || 'Unknown',
  vote_average: movie.vote_average,
  overview: movie.overview,
  genre_ids: movie.genre_ids || [],
});

export const getTrendingMovies = async (): Promise<Movie[]> => {
  try {
    const response = await api.get('/trending/movie/week');
    return response.data.results.map(formatMovieData);
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const searchMovies = async (
    query: string,
    page = 1,
    filters?: MovieFilters
): Promise<SearchResponse> => {
  try {
    const params: Record<string, any> = {
      query,
      page,
      include_adult: false,
    };

    if (filters?.year) {
      params.year = filters.year;
    }
    if (filters?.minRating) {
      params['vote_average.gte'] = filters.minRating;
    }
    if (filters?.genres?.length) {
      params.with_genres = filters.genres.join(',');
    }

    const response = await api.get<SearchResponse>('/search/movie', { params });
    return {
      ...response.data,
      results: response.data.results.map(formatMovieData),
    };
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const getMovieById = async (id: string): Promise<MovieDetails> => {
  try {
    const response = await api.get(`/movie/${id}`, {
      params: {
        append_to_response: 'videos,credits',
      },
    });
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const getMovieRecommendations = async (id: string): Promise<Movie[]> => {
  try {
    const response = await api.get(`/movie/${id}/recommendations`);
    return response.data.results.map(formatMovieData);
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const getGenres = async (): Promise<Genre[]> => {
  try {
    const response = await api.get('/genre/movie/list');
    return response.data.genres;
  } catch (error) {
    handleError(error);
    throw error;
  }
};