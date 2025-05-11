import { Link } from 'react-router-dom';
import { Heart, ArrowLeft } from 'lucide-react';
import { useMovies } from '../contexts/MovieContext';
import MovieGrid from '../components/ui/MovieGrid';

function FavoritesPage() {
  const { favorites } = useMovies();

  return (
    <div className="container-custom mx-auto py-8">
      <Link to="/" className="flex items-center text-primary-600 hover:text-primary-800 mb-6">
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Home
      </Link>
      
      <div className="mb-8">
        <h1 className="text-2xl font-bold flex items-center">
          <Heart className="w-6 h-6 mr-2 text-error-500" />
          My Favorite Movies
        </h1>
      </div>
      
      <MovieGrid 
        movies={favorites} 
        isLoading={false} 
        emptyMessage="You haven't added any movies to your favorites yet" 
      />
    </div>
  );
}

export default FavoritesPage;