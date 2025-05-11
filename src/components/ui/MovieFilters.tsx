import { useState, useEffect } from 'react';
import { Filter, X } from 'lucide-react';
import { MovieFilters, Genre } from '../../types'; // Adjust paths accordingly

interface MovieFiltersProps {
    onFilterChange: (filters: MovieFilters) => void;
    className?: string;
}

function MovieFiltersComponent({ onFilterChange, className = '' }: MovieFiltersProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [genres, setGenres] = useState<Genre[]>([]);
    const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
    const [year, setYear] = useState<string>('2024');
    const [minRating, setMinRating] = useState<string>('6');
    const [sortBy, setSortBy] = useState<string>('Recommended');

    // Mock genre loader – replace with API call
    useEffect(() => {
        const fetchGenres = async () => {
            const mockGenres: Genre[] = [
                { id: 1, name: 'Crime' },
                { id: 2, name: 'Drama' },
                { id: 3, name: 'Thriller' },
                { id: 4, name: 'Comedy' },
            ];
            setGenres(mockGenres);
        };
        fetchGenres();
    }, []);

    const handleGenreToggle = (genreId: number) => {
        setSelectedGenres(prev => {
            const newGenres = prev.includes(genreId)
                ? prev.filter(id => id !== genreId)
                : [...prev, genreId];

            emitFilterChange({ genres: newGenres });
            return newGenres;
        });
    };

    const handleYearChange = (value: string) => {
        setYear(value);
        emitFilterChange({ year: value });
    };

    const handleRatingChange = (value: string) => {
        setMinRating(value);
        emitFilterChange({ minRating: value });
    };

    const handleSortChange = (value: string) => {
        setSortBy(value);
        emitFilterChange({ sortBy: value });
    };

    const emitFilterChange = ({
                                  genres = selectedGenres,
                                  year: y = year,
                                  minRating: r = minRating,
                                  sortBy: s = sortBy
                              }) => {
        onFilterChange({
            genres: genres.length ? genres : undefined,
            year: y ? parseInt(y) : undefined,
            minRating: r ? parseFloat(r) : undefined,
            sortBy: s || undefined,
        });
    };

    const clearFilters = () => {
        setSelectedGenres([]);
        setYear('');
        setMinRating('');
        setSortBy('Recommended');
        onFilterChange({});
    };

    const hasActiveFilters = selectedGenres.length || year || minRating !== '6';

    return (
        <div className={`relative ${className}`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center px-4 py-2 bg-primary-100 text-primary-700 dark:bg-gray-700 dark:text-primary-300 rounded-lg hover:bg-primary-200 dark:hover:bg-gray-600 transition"
            >
                <Filter className="w-5 h-5 mr-2" />
                Filters
                {hasActiveFilters && (
                    <span className="ml-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                        {selectedGenres.length + (year ? 1 : 0) + (minRating ? 1 : 0)}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute top-full mt-2 right-0 w-80 bg-black text-white rounded-2xl shadow-2xl p-6 z-50">
                    <div className="flex justify-between items-center mb-5">
                        <h3 className="text-xl font-semibold">Filters</h3>
                        {hasActiveFilters && (
                            <button
                                onClick={clearFilters}
                                className="text-sm text-gray-400 hover:text-red-500 flex items-center"
                            >
                                <X className="w-4 h-4 mr-1" />
                                Clear All
                            </button>
                        )}
                    </div>

                    <div className="space-y-6">
                        {/* Sort by */}
                        <div>
                            <label className="block text-sm mb-1">Sort by</label>
                            <select
                                value={sortBy}
                                onChange={(e) => handleSortChange(e.target.value)}
                                className="w-full px-3 py-2 rounded-md bg-gray-900 border border-gray-700 text-white"
                            >
                                <option>Recommended</option>
                                <option>Newest</option>
                                <option>Oldest</option>
                                <option>Top Rated</option>
                            </select>
                        </div>

                        {/* Year */}
                        <div>
                            <label className="block text-sm mb-1">Year</label>
                            <select
                                value={year}
                                onChange={(e) => handleYearChange(e.target.value)}
                                className="w-full px-3 py-2 rounded-md bg-gray-900 border border-gray-700 text-white"
                            >
                                {Array.from({ length: 10 }, (_, i) => {
                                    const yr = (2025 - i).toString();
                                    return <option key={yr} value={yr}>{yr}</option>;
                                })}
                            </select>
                        </div>

                        {/* Genres */}
                        <div>
                            <label className="block text-sm mb-2">Genres</label>
                            <div className="flex flex-wrap gap-2">
                                {genres.map((genre) => (
                                    <button
                                        key={genre.id}
                                        onClick={() => handleGenreToggle(genre.id)}
                                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition ${
                                            selectedGenres.includes(genre.id)
                                                ? 'bg-red-600 text-white border-red-600'
                                                : 'bg-gray-800 text-white border-gray-600 hover:bg-gray-700'
                                        }`}
                                    >
                                        {genre.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Rating */}
                        <div>
                            <label className="block text-sm mb-1">Rating</label>
                            <div className="space-y-2">
                                {['8', '7', '6'].map((val) => (
                                    <label key={val} className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="rating"
                                            value={val}
                                            checked={minRating === val}
                                            onChange={() => handleRatingChange(val)}
                                            className="form-radio text-red-600"
                                        />
                                        <span className="text-sm">{val} & up</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Show Results Button */}
                        <button
                            className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-full transition"
                            onClick={() => setIsOpen(false)}
                        >
                            Show 326 results
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MovieFiltersComponent;
