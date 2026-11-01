import { useState, useReducer, useEffect, useCallback, useMemo } from 'react';
import { useFetchPhotos } from '../hooks/useFetchPhotos';
import { favoritesReducer, initFavorites } from '../reducers/favoritesReducer';
import SearchBar from './SearchBar';
import PhotoCard from './PhotoCard';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

const STORAGE_KEY = 'gallery_favorites';

export default function Gallery() {
  const { photos, loading, error } = useFetchPhotos();
  const [searchTerm, setSearchTerm] = useState('');

  // Favorites state managed via useReducer with lazy initialization from localStorage
  const [favorites, dispatch] = useReducer(favoritesReducer, [], initFavorites);

  // Synchronize favorites state to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (err) {
      console.error('Failed to sync favorites with localStorage:', err);
    }
  }, [favorites]);

  // useCallback to keep handler reference stable across re-renders
  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchTerm('');
  }, []);

  // Handler for toggling favorites
  const handleToggleFavorite = useCallback((photoId) => {
    dispatch({ type: 'TOGGLE_FAVORITE', payload: photoId });
  }, []);

  // useMemo to optimize filtering calculation and avoid running on unrelated renders
  const filteredPhotos = useMemo(() => {
    const trimmed = searchTerm.trim().toLowerCase();
    if (!trimmed) {
      return photos;
    }
    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(trimmed)
    );
  }, [photos, searchTerm]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          Photo Gallery
        </h1>
        <p className="mt-2 text-sm sm:text-base text-gray-500">
          Discover curated photos from Picsum and save your favorites
        </p>
      </header>

      {/* Search Bar */}
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onClear={handleClearSearch}
      />

      {/* Search results counter */}
      {!loading && !error && searchTerm.trim() && (
        <div className="flex items-center justify-between max-w-xl mx-auto mb-6 px-1 text-xs sm:text-sm text-gray-500">
          <span>
            Found <strong className="text-gray-900 font-semibold">{filteredPhotos.length}</strong> photo
            {filteredPhotos.length === 1 ? '' : 's'} matching &ldquo;{searchTerm}&rdquo;
          </span>
          <button
            type="button"
            onClick={handleClearSearch}
            className="text-indigo-600 hover:text-indigo-800 font-medium cursor-pointer"
          >
            Clear filter
          </button>
        </div>
      )}

      {/* Content States */}
      {loading && <LoadingSpinner />}

      {error && !loading && <ErrorMessage message={error} />}

      {!loading && !error && (
        <>
          {filteredPhotos.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl border border-gray-100 max-w-xl mx-auto">
              <svg
                className="w-12 h-12 mx-auto text-gray-300 mb-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-gray-700 font-medium">No authors found</p>
              <p className="text-sm text-gray-400 mt-1">
                No photos match &ldquo;{searchTerm}&rdquo;
              </p>
              <button
                type="button"
                onClick={handleClearSearch}
                className="mt-4 px-4 py-2 bg-indigo-50 text-indigo-600 text-xs font-semibold rounded-lg hover:bg-indigo-100 transition"
              >
                View all photos
              </button>
            </div>
          ) : (
            /* Responsive Grid: 4 cols desktop, 2 cols tablet, 1 col mobile */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredPhotos.map((photo) => (
                <PhotoCard
                  key={photo.id}
                  photo={photo}
                  isFavorite={favorites.includes(photo.id)}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
