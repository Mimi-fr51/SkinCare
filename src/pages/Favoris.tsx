// src/pages/Favoris.tsx
import { useState, useEffect } from 'react';
import { Heart, Star, ShoppingCart, X, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

interface Brand {
  id: number;
  name: string;
  brand: string;
  description: string;
  discount: string;
  originalPrice: number;
  salePrice: number;
  image: string;
  rating: number;
  isFavorite: boolean;
  category: string;
}

const Favoris = () => {
  const { addToCart, cartItems } = useCart();
  const [favorites, setFavorites] = useState<Brand[]>([]);

  useEffect(() => {
    // Charger les favoris depuis le localStorage
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const toggleFavorite = (brandId: number) => {
    const updatedFavorites = favorites.filter(brand => brand.id !== brandId);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const handleAddToCart = (brand: Brand) => {
    addToCart({
      name: brand.name,
      price: brand.salePrice.toFixed(2),
      image: brand.image
    });
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-3 h-3 ${
              i < Math.floor(rating) 
                ? 'fill-amber-400 text-amber-400' 
                : 'fill-amber-200 text-amber-200'
            }`}
          />
        ))}
        <span className="text-xs text-amber-700 ml-1">{rating}</span>
      </div>
    );
  };

  const isInCart = (brandName: string) => {
    return cartItems.some(item => item.name === brandName);
  };

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Header */}
      <div className="bg-white border-b border-amber-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link 
              to="/marques" 
              className="flex items-center gap-2 text-amber-600 hover:text-amber-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour aux marques
            </Link>
            <h1 className="text-2xl font-bold text-amber-900">Mes Favoris</h1>
            <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded-full text-sm">
              {favorites.length} produit{favorites.length > 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>

      {/* Contenu */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {favorites.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="w-16 h-16 text-amber-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-amber-800 mb-2">Aucun favori</h2>
            <p className="text-amber-600 mb-6">Ajoutez des produits à vos favoris en cliquant sur le cœur</p>
            <Link 
              to="/marques"
              className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition-colors"
            >
              Découvrir les marques
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((brand) => (
              <div 
                key={brand.id}
                className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-all duration-300 border border-amber-200"
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={brand.image} 
                    alt={brand.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Badge Réduction */}
                  <div className="absolute top-2 left-2">
                    <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-md">
                      -{brand.discount} €
                    </span>
                  </div>

                  {/* Bouton Retirer des favoris */}
                  <button 
                    onClick={() => toggleFavorite(brand.id)}
                    className="absolute top-2 right-2 bg-amber-600 text-white p-2 rounded-full shadow-md hover:bg-amber-700 transition-all duration-200 transform hover:scale-110"
                  >
                    <Heart className="w-3 h-3" fill="currentColor" />
                  </button>

                  {/* Bouton Ajouter au Panier */}
                  <button 
                    onClick={() => handleAddToCart(brand)}
                    className={`absolute bottom-2 right-2 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all duration-300 transform hover:scale-110 ${
                      isInCart(brand.name)
                        ? 'bg-green-500 text-white'
                        : 'bg-amber-600 text-white hover:bg-amber-700'
                    }`}
                  >
                    {isInCart(brand.name) ? '✓' : <ShoppingCart className="w-4 h-4" />}
                  </button>
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-amber-800 bg-amber-100 px-2 py-1 rounded">
                      {brand.category}
                    </span>
                    {renderStars(brand.rating)}
                  </div>

                  <h3 className="font-bold text-amber-900 text-sm mb-1 line-clamp-1">{brand.name}</h3>
                  <p className="text-xs text-amber-700 mb-1 line-clamp-1">{brand.brand}</p>
                  <p className="text-amber-600 text-xs mb-3 line-clamp-2">{brand.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-amber-800">{brand.salePrice.toFixed(2)} €</span>
                      <span className="text-xs text-amber-600 line-through">{brand.originalPrice.toFixed(2)} €</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favoris;