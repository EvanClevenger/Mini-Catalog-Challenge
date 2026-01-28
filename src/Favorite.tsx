import { useState, useEffect } from "react";

const STORAGE_KEY = "mini_catalog:favorites";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [loaded, setLoaded] = useState(false);

  // Load favorites once
  useEffect(() => {
    try {
      const favoritesData = localStorage.getItem(STORAGE_KEY);
      if (favoritesData) {
        setFavorites(JSON.parse(favoritesData));
      }
    } finally {
      setLoaded(true);
    }
  }, []);

  // Save favorites whenever they change
  useEffect(() => {
    if (!loaded) return; // prevent overwriting before initial load
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error("Failed to save favorites to localStorage:", error);
    }
  }, [favorites, loaded]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return { favorites, toggleFavorite, loaded };
};
