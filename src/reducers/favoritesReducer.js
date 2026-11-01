const STORAGE_KEY = 'gallery_favorites';

export const initFavorites = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Failed to load favorites from localStorage:', error);
    return [];
  }
};

export const favoritesReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_FAVORITE': {
      const photoId = action.payload;
      const exists = state.includes(photoId);
      return exists
        ? state.filter((id) => id !== photoId)
        : [...state, photoId];
    }
    default:
      return state;
  }
};

