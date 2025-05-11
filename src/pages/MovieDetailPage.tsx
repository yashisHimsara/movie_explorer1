import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Calendar, Clock, Heart, HeartOff, ArrowLeft } from 'lucide-react';
import { useMovies } from '../contexts/MovieContext';
import { MovieDetails } from '../types';
import { IMAGE_BASE_URL, POSTER_SIZES, BACKDROP_SIZES } from '../services/api';
import ErrorMessage from '../components/ui/ErrorMessage';

function MovieDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getMovieDetails, isLoading, error, addToFavorites, removeFromFavorites, isFavorite } = useMovies();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (id) {
        const details = await getMovieDetails(id);
        setMovie(details);
        if (details) {
          setFavorite(isFavorite(details.id));
        }
      }
    };

    fetchMovieDetails();
  }, [id, getMovieDetails, isFavorite]);

  const goBack = () => {
    navigate(-1);
  };

  const toggleFavorite = () => {
    if (!movie) return;
    
    if (favorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
    
    setFavorite(!favorite);
  };

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  // Handle loading state
  if (isLoading) {
    return (
      <div className="container-custom mx-auto py-12 flex justify-center">
        <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle error state
  if (error || !movie) {
    return (
      <div className="container-custom mx-auto py-12">
        <button onClick={goBack} className="flex items-center text-primary-600 hover:text-primary-800 mb-6">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Go back
        </button>
        <ErrorMessage message={error || "Movie not found"} />
      </div>
    );
  }

  // Prepare image URLs
  const backdropUrl = movie.backdrop_path 
    ? `${IMAGE_BASE_URL}${BACKDROP_SIZES.large}${movie.backdrop_path}`
    : null;
  
  const posterUrl = movie.poster_path 
    ? `${IMAGE_BASE_URL}${POSTER_SIZES.large}${movie.poster_path}`
    : 'https://placehold.co/500x750?text=No+Image';

  // Find trailer if available
  const trailer = movie.videos?.results.find(
    video => video.site === 'YouTube' && (video.type === 'Trailer' || video.type === 'Teaser')
  );

  // Format release date
  const releaseDate = movie.release_date 
    ? new Date(movie.release_date).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    : 'Unknown';

  return (
    <div>
      {/* Backdrop */}
      {backdropUrl && (
        <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
          <img 
            src={backdropUrl} 
            alt={`${movie.title} backdrop`} 
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="container-custom mx-auto py-8">
        <button onClick={goBack} className="flex items-center text-primary-600 hover:text-primary-800 mb-6">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Go back
        </button>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0">
            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg">
              <img 
                src={posterUrl} 
                alt={`${movie.title} poster`} 
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Movie Info */}
          <div className="flex-grow">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">{movie.title}</h1>
                {movie.tagline && (
                  <p className="text-lg text-gray-600 dark:text-gray-400 mt-2 italic">
                    "{movie.tagline}"
                  </p>
                )}
              </div>
              
              <button 
                onClick={toggleFavorite}
                className={`flex items-center px-4 py-2 rounded-full ${
                  favorite 
                    ? 'bg-error-500 hover:bg-error-600 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white'
                } transition-colors`}
              >
                {favorite ? (
                  <>
                    <HeartOff className="w-5 h-5 mr-2" />
                    Remove Favorite
                  </>
                ) : (
                  <>
                    <Heart className="w-5 h-5 mr-2" />
                    Add to Favorites
                  </>
                )}
              </button>
            </div>

            {/* Movie Details */}
            <div className="flex flex-wrap gap-4 mt-6">
              <div className="flex items-center bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                <Star className="w-5 h-5 text-accent-500 mr-1" />
                <span className="font-medium">{movie.vote_average.toFixed(1)}</span>
              </div>
              
              <div className="flex items-center bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                <Calendar className="w-5 h-5 text-primary-500 mr-1" />
                <span>{releaseDate}</span>
              </div>
              
              {movie.runtime > 0 && (
                <div className="flex items-center bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                  <Clock className="w-5 h-5 text-primary-500 mr-1" />
                  <span>{formatRuntime(movie.runtime)}</span>
                </div>
              )}
            </div>

            {/* Genres */}
            <div className="mt-6">
              <div className="flex flex-wrap gap-2">
                {movie.genres.map(genre => (
                  <span 
                    key={genre.id}
                    className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Overview */}
            <div className="mt-6">
              <h2 className="text-xl font-bold mb-2">Overview</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {movie.overview || "No overview available."}
              </p>
            </div>

            {/* Trailer */}
            {trailer && (
              <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">Trailer</h2>
                <div className="aspect-video rounded-lg overflow-hidden bg-gray-900">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${trailer.key}`}
                    title={`${movie.title} trailer`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}

            {/* Cast */}
            {movie.credits?.cast && movie.credits.cast.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">Cast</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {movie.credits.cast.slice(0, 10).map(person => (
                    <div key={person.id} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
                      <img 
                        src={person.profile_path 
                          ? `${IMAGE_BASE_URL}${POSTER_SIZES.small}${person.profile_path}` 
                          : 'https://placehold.co/185x278?text=No+Image'
                        } 
                        alt={person.name}
                        className="w-full h-auto aspect-[2/3] object-cover"
                      />
                      <div className="p-2">
                        <p className="font-medium text-sm truncate">{person.name}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 truncate">{person.character}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetailPage;