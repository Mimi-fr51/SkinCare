import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Product {
  id: number;
  name: string;
  brand: string;
  description: string;
  discount: string;
  originalPrice: number;
  salePrice: number;
  image: string;
  rating: number;
  category: string;
  isNew: boolean;
  releaseDate: string;
}

interface FavoritesContextType {
  favorites: Product[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: number) => void;
  toggleFavorite: (product: Product) => void;
  isFavorite: (productId: number) => boolean;
  clearAllFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Product[]>([]);

  // Charger les favoris depuis le localStorage au démarrage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      try {
        const parsedFavorites = JSON.parse(savedFavorites);
        setFavorites(Array.isArray(parsedFavorites) ? parsedFavorites : []);
      } catch (error) {
        console.error('Error parsing favorites from localStorage:', error);
        setFavorites([]);
      }
    }
  }, []);

  // Sauvegarder les favoris dans le localStorage à chaque changement
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (product: Product) => {
    setFavorites(prev => {
      // Éviter les doublons
      if (prev.some(fav => fav.id === product.id)) {
        return prev;
      }
      return [...prev, product];
    });
  };

  const removeFromFavorites = (productId: number) => {
    setFavorites(prev => prev.filter(product => product.id !== productId));
  };

  const toggleFavorite = (product: Product) => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  const isFavorite = (productId: number) => {
    return favorites.some(product => product.id === productId);
  };

  const clearAllFavorites = () => {
    setFavorites([]);
  };

  return (
    <FavoritesContext.Provider value={{
      favorites,
      addToFavorites,
      removeFromFavorites,
      toggleFavorite,
      isFavorite,
      clearAllFavorites
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};