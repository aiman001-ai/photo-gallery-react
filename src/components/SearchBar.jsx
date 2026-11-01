import React from 'react';

const SearchBar = React.memo(function SearchBar({ searchTerm, onSearchChange, onClear }) {
  return (
    <div className="w-full max-w-xl mx-auto mb-8">
      <div className="relative">
        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </span>
        <input
          type="text"
          value={searchTerm}
          onChange={onSearchChange}
          placeholder="Search by author name (e.g. Luke, Ryan, Shyamanta)..."
          autoComplete="off"
          spellCheck="false"
          className="w-full pl-10 pr-10 py-3 bg-white border border-gray-200 rounded-xl shadow-sm text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={onClear}
            aria-label="Clear search"
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
});

export default SearchBar;
