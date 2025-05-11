import { useEffect } from 'react';
import { useMovies } from '../contexts/MovieContext';
import MovieGrid from '../components/ui/MovieGrid';
import SearchInput from '../components/ui/SearchInput';
import ErrorMessage from '../components/ui/ErrorMessage';
import { Film } from 'lucide-react';

function HomePage() {
  const { trendingMovies, fetchTrendingMovies, isLoading, error } = useMovies();

  useEffect(() => {
    fetchTrendingMovies();
  }, []);

  return (
      <div className="px-4 md:px-8 lg:px-16 py-10 bg-gray-50 dark:bg-gray-900 min-h-screen">
        {/* Hero Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 dark:from-indigo-800 dark:to-purple-900 rounded-3xl shadow-xl p-8 md:p-12 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Explore Epic Movies</h1>
              <p className="text-xl mb-8 text-white/80">
                Dive into trending films, find your favorites, and create your ultimate movie collection.
              </p>
              <div className="max-w-xl mx-auto">
                <SearchInput className="bg-white text-gray-800 rounded-xl shadow-md focus:ring-4 focus:ring-purple-300 transition duration-200" />
              </div>
            </div>
          </div>
        </section>

        {/* Trending Movies Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">🔥 Trending This Week</h2>
          </div>

          {error ? (
              <ErrorMessage message={error} />
          ) : (
              <MovieGrid
                  movies={trendingMovies}
                  isLoading={isLoading}
                  emptyMessage="Failed to load trending movies"
              />
          )}
        </section>
      </div>
  );
}

export default HomePage;
