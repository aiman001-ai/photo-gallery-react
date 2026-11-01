# Photo Gallery Web App

A responsive photo gallery application built with React, Vite, and Tailwind CSS. The app fetches photos from the Picsum Photos API, displays them in a responsive grid, allows real-time search filtering by author, and manages favorites with persistent local storage.

## Features

- **Photo Fetching**: Fetches 30 photos from Picsum API (`https://picsum.photos/v2/list?limit=30`) on initial load with loading and error states.
- **Custom Hook (`useFetchPhotos`)**: Encapsulates API fetching, error handling, and loading state logic.
- **Responsive Grid**:
  - Desktop: 4 columns
  - Tablet: 2 columns
  - Mobile: 1 column
- **Real-time Search Filter**: Filters photos by author name instantaneously without re-fetching or page reloads.
- **Favorites with `useReducer`**: Toggles favorite status on photo cards, persisting state across page refreshes via `localStorage`.
- **Performance Optimization**: Implements `useCallback` on search and toggle handlers and `useMemo` on the search filtering logic.

## Tech Stack

- **React 19**
- **Vite**
- **Tailwind CSS**

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd <repo-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```
