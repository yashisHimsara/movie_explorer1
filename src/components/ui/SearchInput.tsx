import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { useMovies } from '../../contexts/MovieContext';

interface SearchInputProps {
  onClose?: () => void;
  className?: string;
}

function SearchInput({ onClose, className = '' }: SearchInputProps) {
  const { searchForMovies, lastSearch } = useMovies();
  const [query, setQuery] = useState(lastSearch || '');
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      await searchForMovies(query);
      if (onClose) onClose();
      navigate('/search');
    }
  };

  const clearSearch = () => {
    setQuery('');
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies..."
          className="input pr-12"
          aria-label="Search for movies"
        />
        {query && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            aria-label="Clear search"
          >
            <X className="w-5 h-5" />
          </button>
        )}
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-primary-600 text-white hover:bg-primary-700 transition-colors"
          disabled={!query.trim()}
          aria-label="Search"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
}

export default SearchInput;