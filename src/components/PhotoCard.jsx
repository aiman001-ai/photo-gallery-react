import React from 'react';

const PhotoCard = React.memo(function PhotoCard({ photo, isFavorite, onToggleFavorite }) {
  // Using 600x400 image size from Picsum for optimal aspect ratio and fast load
  const imageUrl = `https://picsum.photos/id/${photo.id}/600/400`;

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-gray-100 flex flex-col">
      <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
        <img
          src={imageUrl}
          alt={`Photo by ${photo.author}`}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <button
          type="button"
          onClick={() => onToggleFavorite(photo.id)}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:scale-110 active:scale-95 transition-all duration-150 focus:outline-none cursor-pointer"
        >
          <svg
            className={`w-5 h-5 transition-colors duration-200 ${
              isFavorite
                ? 'fill-red-500 text-red-500'
                : 'fill-transparent text-gray-500 hover:text-red-500'
            }`}
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>

      <div className="p-4 flex items-center justify-between">
        <div className="min-w-0 pr-2">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-indigo-600">Author</p>
          <h3 className="text-sm font-semibold text-gray-800 truncate" title={photo.author}>
            {photo.author}
          </h3>
        </div>
      </div>
    </div>
  );
});

export default PhotoCard;
