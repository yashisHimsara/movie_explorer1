import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, ArrowLeft } from 'lucide-react';
import { useMovies } from '../contexts/MovieContext';
import MovieGrid from '../components/ui/MovieGrid';
import ErrorMessage from '../components/ui/ErrorMessage';
import SearchInput from '../components/ui/SearchInput';
import MovieFilters from '../components/ui/MovieFilters';
import { MovieFilters as MovieFiltersType } from '../types';

function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const {
    searchResults,
    searchForMovies,
    loadMoreResults,
    lastSearch,
    isLoading,
    error,
    hasMore,
    currentPage
  } = useMovies();
  const query = searchParams.get('q') || lastSearch;
  const [filters, setFilters] = useState<MovieFiltersType>({});

  useEffect(() => {
    if (query && query !== lastSearch) {
      searchForMovies(query, 1, filters);
    }
  }, [query, lastSearch, searchForMovies, filters]);

  const handleFilterChange = (newFilters: MovieFiltersType) => {
    setFilters(newFilters);
    if (lastSearch) {
      searchForMovies(lastSearch, 1, newFilters);
    }
  };

  const handleLoadMore = () => {
    if (!isLoading && hasMore && lastSearch) {
      loadMoreResults();
    }
  };

  return (
      <div className="container-custom mx-auto py-8">
        <Link to="/" className="flex items-center text-primary-600 hover:text-primary-800 mb-6">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </Link>

        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="flex-grow">
              <SearchInput />
            </div>
            <MovieFilters onFilterChange={handleFilterChange} />
          </div>
          <h1 className="text-2xl font-bold flex items-center">
            <Search className="w-6 h-6 mr-2 text-primary-600" />
            {lastSearch ? `Search results for "${lastSearch}"` : 'Search Movies'}
          </h1>
        </div>

        {error ? (
            <ErrorMessage message={error} />
        ) : (
            <>
              <MovieGrid
                  movies={searchResults}
                  isLoading={isLoading && currentPage === 1}
                  emptyMessage={lastSearch ? `No results found for "${lastSearch}"` : 'Start searching for movies'}
              />

              {hasMore && (
                  <div className="flex justify-center mt-8">
                    <button
                        onClick={handleLoadMore}
                        disabled={isLoading}
                        className="btn-primary flex items-center space-x-2"
                    >
                      {isLoading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Loading...</span>
                          </>
                      ) : (
                          <span>Load More</span>
                      )}
                    </button>
                  </div>
              )}
            </>
        )}
      </div>
  );
}

export default SearchResultsPage;