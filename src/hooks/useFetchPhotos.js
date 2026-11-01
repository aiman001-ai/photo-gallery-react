import { useState, useEffect } from 'react';

// Using page=2 to fetch 30 photos with diverse authors (page 1 has 15 duplicate photos by the same author)
const API_URL = 'https://picsum.photos/v2/list?page=2&limit=30';

export const useFetchPhotos = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchPhotos = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(`Failed to fetch photos (Status: ${response.status})`);
        }

        const data = await response.json();

        if (isMounted) {
          setPhotos(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Something went wrong while fetching photos.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchPhotos();

    return () => {
      isMounted = false;
    };
  }, []);

  return { photos, loading, error };
};
