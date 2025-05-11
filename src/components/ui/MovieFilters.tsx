import { useState, useEffect } from 'react';
import { Filter, X } from 'lucide-react';
import { MovieFilters, Genre } from '../../types';

interface MovieFiltersProps {
    onFilterChange: (filters: MovieFilters) => void;
    className?: string;
}

function MovieFiltersComponent({ onFilterChange, className = '' }: MovieFiltersProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [genres, setGenres] = useState<Genre[]>([]);
    const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
    const [year, setYear] = useState<string>('');
    const [minRating, setMinRating] = useState<string>('');

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const genreList = await getGenres();
                setGenres(genreList);
            } catch (error) {
                console.error('Failed to fetch genres:', error);
            }
        };
        fetchGenres();
    }, []);

    const handleGenreToggle = (genreId: number) => {
        setSelectedGenres(prev => {
            const newGenres = prev.includes(genreId)
                ? prev.filter(id => id !== genreId)
                : [...prev, genreId];

            onFilterChange({
                genres: newGenres.length > 0 ? newGenres : undefined,
                year: year ? parseInt(year) : undefined,
                minRating: minRating ? parseFloat(minRating) : undefined,
            });

            return newGenres;
        });
    };

    const handleYearChange = (value: string) => {
        setYear(value);
        onFilterChange({
            genres: selectedGenres.length > 0 ? selectedGenres : undefined,
            year: value ? parseInt(value) : undefined,
            minRating: minRating ? parseFloat(minRating) : undefined,
        });
    };

    const handleRatingChange = (value: string) => {
        setMinRating(value);
        onFilterChange({
            genres: selectedGenres.length > 0 ? selectedGenres : undefined,
            year: year ? parseInt(year) : undefined,
            minRating: value ? parseFloat(value) : undefined,
        });
    };

    const clearFilters = () => {
        setSelectedGenres([]);
        setYear('');
        setMinRating('');
        onFilterChange({});
    };

    const hasActiveFilters = selectedGenres.length > 0 || year || minRating;

    return (
        <div className={`relative ${className}`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center px-4 py-2 bg-primary-100 text-primary-700 dark:bg-gray-700 dark:text-primary-300 rounded-lg hover:bg-primary-200 dark:hover:bg-gray-600 transition"
            >
                <Filter className="w-5 h-5 mr-2" />
                Filters
                {hasActiveFilters && (
                    <span className="ml-2 bg-primary-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {selectedGenres.length + (year ? 1 : 0) + (minRating ? 1 : 0)}
          </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute top-full mt-2 right-0 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-5 z-20">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">Filters</h3>
                        {hasActiveFilters && (
                            <button
                                onClick={clearFilters}
                                className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 flex items-center"
                            >
                                <X className="w-4 h-4 mr-1" />
                                Clear
                            </button>
                        )}
                    </div>

                    <div className="space-y-5">
                        {/* Year Filter */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Release Year</label>
                            <input
                                type="number"
                                value={year}
                                onChange={(e) => handleYearChange(e.target.value)}
                                placeholder="e.g. 2023"
                                min="1900"
                                max={new Date().getFullYear()}
                                className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                        </div>

                        {/* Rating Filter */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Minimum Rating</label>
                            <input
                                type="number"
                                value={minRating}
                                onChange={(e) => handleRatingChange(e.target.value)}
                                placeholder="0 - 10"
                                min="0"
                                max="10"
                                step="0.5"
                                className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                        </div>

                        {/* Genre Filter */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Genres</label>
                            <div className="flex flex-wrap gap-2">
                                {genres.map(genre => (
                                    <button
                                        key={genre.id}
                                        onClick={() => handleGenreToggle(genre.id)}
                                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition ${
                                            selectedGenres.includes(genre.id)
                                                ? 'bg-primary-600 text-white border-primary-600'
                                                : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600'
                                        }`}
                                    >
                                        {genre.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MovieFiltersComponent;
