import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getMovieById, getTrendingMovies, searchMovies } from '../services/api';
import { Movie, MovieDetails, SearchResponse, MovieFilters } from '../types';

interface MovieContextType {
  trendingMovies: Movie[];
  searchResults: Movie[];
  favorites: Movie[];
  lastSearch: string;
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
  currentPage: number;
  fetchTrendingMovies: () => Promise<void>;
  searchForMovies: (query: string, page?: number, filters?: MovieFilters) => Promise<void>;
  loadMoreResults: () => Promise<void>;
  getMovieDetails: (id: string) => Promise<MovieDetails | null>;
  addToFavorites: (movie: Movie) => void;
  removeFromFavorites: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export function MovieProvider({ children }: { children: ReactNode }) {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [lastSearch, setLastSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentFilters, setCurrentFilters] = useState<MovieFilters>({});

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }

    const storedLastSearch = localStorage.getItem('lastSearch');
    if (storedLastSearch) {
      setLastSearch(storedLastSearch);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    if (lastSearch) {
      localStorage.setItem('lastSearch', lastSearch);
    }
  }, [lastSearch]);

  const fetchTrendingMovies = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getTrendingMovies();
      setTrendingMovies(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch trending movies');
    } finally {
      setIsLoading(false);
    }
  };

  const searchForMovies = async (query: string, page = 1, filters?: MovieFilters) => {
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);

    if (page === 1) {
      setSearchResults([]);
      setCurrentPage(1);
    }

    setLastSearch(query);
    setCurrentFilters(filters || {});

    try {
      const data = await searchMovies(query, page, filters);
      if (page === 1) {
        setSearchResults(data.results);
      } else {
        setSearchResults(prev => [...prev, ...data.results]);
      }
      setTotalPages(data.total_pages);
      setHasMore(page < data.total_pages);
      setCurrentPage(page);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search movies');
    } finally {
      setIsLoading(false);
    }
  };

  const loadMoreResults = async () => {
    if (!isLoading && hasMore && lastSearch) {
      await searchForMovies(lastSearch, currentPage + 1, currentFilters);
    }
  };

  const getMovieDetails = async (id: string): Promise<MovieDetails | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const details = await getMovieById(id);
      return details;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch movie details');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const addToFavorites = (movie: Movie) => {
    if (!favorites.some(fav => fav.id === movie.id)) {
      setFavorites(prev => [...prev, movie]);
    }
  };

  const removeFromFavorites = (id: number) => {
    setFavorites(prev => prev.filter(movie => movie.id !== id));
  };

  const isFavorite = (id: number) => {
    return favorites.some(movie => movie.id === id);
  };

  return (
      <MovieContext.Provider
          value={{
            trendingMovies,
            searchResults,
            favorites,
            lastSearch,
            isLoading,
            error,
            hasMore,
            currentPage,
            fetchTrendingMovies,
            searchForMovies,
            loadMoreResults,
            getMovieDetails,
            addToFavorites,
            removeFromFavorites,
            isFavorite
          }}
      >
        {children}
      </MovieContext.Provider>
  );
}

export function useMovies() {
  const context = useContext(MovieContext);
  if (context === undefined) {
    throw new Error('useMovies must be used within a MovieProvider');
  }
  return context;
}