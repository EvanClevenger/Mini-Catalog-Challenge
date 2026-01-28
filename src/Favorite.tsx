import { useState, useEffect } from "react";

const STORAGE_KEY = "mini_catalog:favorites";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [favoritesLoaded, setFavoritesLoaded] = useState(false);

  // Load favorites once
  useEffect(() => {
    try {
      const favoritesData = localStorage.getItem(STORAGE_KEY);
      if (favoritesData) {
        setFavorites(JSON.parse(favoritesData));
      }
    } finally {
      setFavoritesLoaded(true);
    }
  }, []);

  // Save favorites whenever they change
  useEffect(() => {
    if (!favoritesLoaded) return; // prevent overwriting before initial load
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error("Failed to save favorites to localStorage:", error);
    }
  }, [favorites, favoritesLoaded]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return { favorites, toggleFavorite, favoritesLoaded };
};
