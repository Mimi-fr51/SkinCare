import React from 'react';
import { Heart } from 'lucide-react';
import { useFavorites, Product } from '../context/FavoritesContext';

interface HeartButtonProps {
  product: Product;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const HeartButton: React.FC<HeartButtonProps> = ({ product, size = 'md', className = '' }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isFav = isFavorite(product.id);

  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        toggleFavorite(product);
      }}
      className={`transition-all duration-300 transform hover:scale-110 ${
        isFav 
          ? 'text-red-500 hover:text-red-600' 
          : 'text-amber-400 hover:text-amber-500'
      } ${className}`}
    >
      <Heart 
        className={sizes[size]} 
        fill={isFav ? "currentColor" : "none"}
      />
    </button>
  );
};

export default HeartButton;