import { Link } from 'react-router-dom';
import { Star, Heart, HeartOff } from 'lucide-react';
import { useState } from 'react';
import { Movie } from '../../types';
import { IMAGE_BASE_URL, POSTER_SIZES } from '../../services/api';
import { useMovies } from '../../contexts/MovieContext';

interface MovieCardProps {
  movie: Movie;
}

function MovieCard({ movie }: MovieCardProps) {
  const { addToFavorites, removeFromFavorites, isFavorite } = useMovies();
  const [favorite, setFavorite] = useState(isFavorite(movie.id));
  
  // Format release date to year only
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'Unknown';
  
  // Format rating color based on value
  const getRatingColor = (rating: number) => {
    if (rating >= 7) return 'bg-success-500';
    if (rating >= 5) return 'bg-accent-500';
    return 'bg-error-500';
  };
  
  // Handle placeholder image if poster is missing
  const posterUrl = movie.poster_path 
    ? `${IMAGE_BASE_URL}${POSTER_SIZES.medium}${movie.poster_path}`
    : 'https://placehold.co/342x513?text=No+Image';
  
  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (favorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
    
    setFavorite(!favorite);
  };

  return (
    <Link to={`/movie/${movie.id}`} className="movie-card group">
      {/* Favorite Button */}
      <button
        onClick={toggleFavorite}
        className="absolute top-2 left-2 z-10 p-1.5 bg-black bg-opacity-50 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-black"
        aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        {favorite ? <HeartOff className="w-5 h-5" /> : <Heart className="w-5 h-5" />}
      </button>
      
      {/* Rating Badge */}
      <div className={`rating-badge ${getRatingColor(movie.vote_average)}`}>
        <div className="flex items-center">
          <Star className="w-3 h-3 mr-0.5" />
          <span>{movie.vote_average.toFixed(1)}</span>
        </div>
      </div>
      
      {/* Poster Image with Overlay */}
      <div className="relative overflow-hidden">
        <img 
          src={posterUrl} 
          alt={`${movie.title} poster`}
          className="movie-card-image transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
      </div>
      
      {/* Movie Info */}
      <div className="movie-card-content">
        <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {movie.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{releaseYear}</p>
      </div>
    </Link>
  );
}

export default MovieCard;