import { Movie } from '../../types';
import MovieCard from './MovieCard';
import LoadingSkeleton from './LoadingSkeleton';

interface MovieGridProps {
  movies: Movie[];
  isLoading: boolean;
  emptyMessage?: string;
}

function MovieGrid({ movies, isLoading, emptyMessage = 'No movies found' }: MovieGridProps) {
  // Show loading skeletons when loading
  if (isLoading) {
    return (
      <div className="movie-grid">
        {Array.from({ length: 10 }).map((_, index) => (
          <LoadingSkeleton key={index} />
        ))}
      </div>
    );
  }

  // Show empty message when no movies
  if (movies.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-xl text-gray-600 dark:text-gray-400">{emptyMessage}</p>
      </div>
    );
  }

  // Show movie grid
  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

export default MovieGrid;