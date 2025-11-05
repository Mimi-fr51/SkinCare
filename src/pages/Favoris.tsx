import { useState } from 'react';
import { Heart, Star, ShoppingCart, X, ArrowLeft, Plus, Calendar } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useFavorites, Product } from '../context/FavoritesContext';
import { Link } from 'react-router-dom';

const Favoris = () => {
  const { addToCart, cartItems } = useCart();
  const { favorites, toggleFavorite, clearAllFavorites } = useFavorites();
  const [activeTab, setActiveTab] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showZoom, setShowZoom] = useState(false);

  // Debug
  console.log('Favoris actuels:', favorites);
  console.log('Nombre de favoris:', favorites.length);

  const handleAddToCart = (product: Product) => {
    addToCart({
      name: product.name,
      price: product.salePrice.toFixed(2),
      image: product.image
    });
  };

  const handleZoom = (product: Product) => {
    setSelectedProduct(product);
    setShowZoom(true);
  };

  const closeZoom = () => {
    setShowZoom(false);
    setTimeout(() => setSelectedProduct(null), 300);
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

  const isInCart = (productName: string) => {
    return cartItems.some(item => item.name === productName);
  };

  // Catégories corrigées pour correspondre aux catégories des produits
  const categories = ['all', 'Soin Visage', 'Soin Corps', 'Maquillage', 'Soin Cheveux'];

  const filteredFavorites = favorites.filter(product => {
    if (activeTab === 'all') return true;
    return product.category === activeTab;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Statistiques des favoris
  const favoritesStats = {
    total: favorites.length,
    soinVisage: favorites.filter(p => p.category === 'Soin Visage').length,
    corps: favorites.filter(p => p.category === 'Soin Corps').length,
    maquillage: favorites.filter(p => p.category === 'Maquillage').length,
    cheveux: favorites.filter(p => p.category === 'Soin Cheveux').length,
  };

  return (
    <div className="min-h-screen bg-amber-50 pt-20">
      {/* Header */}
      <div className="bg-white border-b border-amber-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Bouton Retour en haut à gauche */}
          <div className="flex items-center justify-between mb-4">
            <Link 
              to="/marques" 
              className="flex items-center gap-2 text-amber-600 hover:text-amber-700 transition-colors text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour aux marques
            </Link>
            
            {favorites.length > 0 && (
              <button 
                onClick={clearAllFavorites}
                className="text-red-500 hover:text-red-700 text-sm transition-colors font-medium"
              >
                Vider tous les favoris
              </button>
            )}
          </div>

          {/* Titre principal et compteur */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-amber-900 mb-2">Mes Favoris</h1>
            <p className="text-amber-600 text-sm">
              {favorites.length} produit{favorites.length > 1 ? 's' : ''} sauvegardé{favorites.length > 1 ? 's' : ''}
            </p>
          </div>

          {/* Navigation par onglets */}
          <div className="border-b border-amber-200">
            <div className="flex justify-center space-x-8">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveTab(category)}
                  className={`pb-3 px-1 text-sm font-medium transition-all duration-200 relative ${
                    activeTab === category
                      ? 'text-amber-600'
                      : 'text-amber-400 hover:text-amber-500'
                  }`}
                >
                  {category === 'all' ? 'Tous' : category}
                  {activeTab === category && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-600"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Statistiques rapides */}
      {favorites.length > 0 && (
        <div className="bg-amber-100 border-b border-amber-200">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex flex-wrap gap-6 text-sm text-amber-700 justify-center">
              <span>Total: <strong>{favoritesStats.total}</strong></span>
              {favoritesStats.soinVisage > 0 && (
                <span>Soins Visage: <strong>{favoritesStats.soinVisage}</strong></span>
              )}
              {favoritesStats.corps > 0 && (
                <span>Corps: <strong>{favoritesStats.corps}</strong></span>
              )}
              {favoritesStats.maquillage > 0 && (
                <span>Maquillage: <strong>{favoritesStats.maquillage}</strong></span>
              )}
              {favoritesStats.cheveux > 0 && (
                <span>Cheveux: <strong>{favoritesStats.cheveux}</strong></span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {favorites.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="w-16 h-16 text-amber-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-amber-800 mb-2">Aucun favori</h2>
            <p className="text-amber-600 mb-6">Ajoutez des produits à vos favoris en cliquant sur le cœur</p>
            <div className="flex gap-4 justify-center">
              <Link 
                to="/marques"
                className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition-colors font-medium"
              >
                Découvrir les marques
              </Link>
              <Link 
                to="/nouveautes"
                className="bg-amber-200 text-amber-800 px-6 py-2 rounded-lg hover:bg-amber-300 transition-colors font-medium"
              >
                Voir les nouveautés
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Grille des produits favoris */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredFavorites.map((product) => (
                <div 
                  key={product.id}
                  className="bg-white rounded-lg overflow-hidden group hover:shadow-lg transition-all duration-300 border border-amber-200"
                >
                  <div className="relative overflow-hidden">
                    {/* Image cliquable */}
                    <div 
                      onClick={() => handleZoom(product)}
                      className="cursor-pointer"
                    >
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    
                    {/* Badges sur l'image */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs font-medium">
                        {product.category}
                      </span>
                      {product.isNew && (
                        <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          NOUVEAU
                        </span>
                      )}
                    </div>

                    {/* Note sur l'image */}
                    <div className="absolute top-2 right-2 bg-white bg-opacity-90 px-2 py-1 rounded-full">
                      {renderStars(product.rating)}
                    </div>

                    {/* Bouton Retirer des favoris */}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(product);
                      }}
                      className="absolute top-14 right-2 bg-red-500 text-white p-2 rounded-full shadow-md hover:bg-red-600 transition-all duration-200 transform hover:scale-110"
                    >
                      <Heart className="w-3 h-3" fill="currentColor" />
                    </button>
                  </div>

                  <div className="p-4">
                    {/* Nom du produit cliquable */}
                    <h3 
                      onClick={() => handleZoom(product)}
                      className="font-bold text-amber-900 text-base mb-1 cursor-pointer hover:text-amber-700 transition-colors line-clamp-1"
                    >
                      {product.name}
                    </h3>
                    <p className="text-sm text-amber-700 mb-2">{product.brand}</p>
                    <p className="text-amber-600 text-xs mb-4 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-amber-800">{product.salePrice.toFixed(2)} €</span>
                        <span className="text-sm text-amber-600 line-through">{product.originalPrice.toFixed(2)} €</span>
                      </div>
                      
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(product);
                        }}
                        className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                          isInCart(product.name)
                            ? 'bg-green-500 text-white hover:bg-green-600'
                            : 'bg-amber-600 text-white hover:bg-amber-700'
                        }`}
                      >
                        {isInCart(product.name) ? '✓ Ajouté' : <><ShoppingCart className="w-4 h-4" /> Ajouter</>}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message si aucun produit dans la catégorie filtrée */}
            {filteredFavorites.length === 0 && favorites.length > 0 && (
              <div className="text-center py-8">
                <p className="text-amber-500 text-sm">Aucun favori trouvé dans cette catégorie.</p>
                <button 
                  onClick={() => setActiveTab('all')}
                  className="text-amber-600 hover:text-amber-700 text-sm mt-2 font-medium"
                >
                  Voir tous les favoris
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal de détail du produit */}
      {showZoom && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-amber-900 bg-opacity-50 backdrop-blur-sm"
            onClick={closeZoom}
          ></div>
          
          <div className="bg-amber-50 border border-amber-200 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto relative z-10 animate-scale-in">
            <button 
              onClick={closeZoom}
              className="absolute top-2 right-2 z-20 bg-amber-100 hover:bg-amber-200 rounded-full p-2 shadow transition-colors duration-200 border border-amber-300"
            >
              <X className="w-4 h-4 text-amber-700" />
            </button>
            
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-2 left-2 flex gap-2">
                  <span className="bg-amber-600 text-white px-2 py-1 rounded text-xs font-bold">
                    -{selectedProduct.discount}%
                  </span>
                  {selectedProduct.isNew && (
                    <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      NOUVEAU
                    </span>
                  )}
                </div>
              </div>
              
              <div className="p-4 flex flex-col justify-center">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-amber-800 bg-amber-100 px-2 py-1 rounded">
                    {selectedProduct.category}
                  </span>
                  {renderStars(selectedProduct.rating)}
                </div>

                <h2 className="text-lg font-bold text-amber-900 mb-1">{selectedProduct.name}</h2>
                <p className="text-sm text-amber-700 mb-3">{selectedProduct.brand}</p>
                
                <p className="text-amber-600 text-sm mb-4 leading-relaxed">{selectedProduct.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between py-1 border-b border-amber-200">
                    <span className="text-amber-600 text-xs">Date de sortie</span>
                    <span className="font-medium text-amber-900 text-xs">{formatDate(selectedProduct.releaseDate)}</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-amber-200">
                    <span className="text-amber-600 text-xs">Type</span>
                    <span className="font-medium text-amber-900 text-xs">{selectedProduct.category}</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-amber-200">
                    <span className="text-amber-600 text-xs">Texture</span>
                    <span className="font-medium text-amber-900 text-xs">Légère</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-amber-200">
                    <span className="text-amber-600 text-xs">Volume</span>
                    <span className="font-medium text-amber-900 text-xs">50ml</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-amber-200">
                    <span className="text-amber-600 text-xs">Statut</span>
                    <span className="font-medium text-green-600 text-xs">Dans vos favoris</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-3 border-t border-amber-200">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-amber-800">{selectedProduct.salePrice.toFixed(2)} €</span>
                    <span className="text-sm text-amber-600 line-through">{selectedProduct.originalPrice.toFixed(2)} €</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={() => toggleFavorite(selectedProduct)}
                      className="bg-red-500 text-white p-2 rounded border border-red-500 transition-all duration-200 transform hover:scale-110"
                    >
                      <Heart className="w-4 h-4" fill="currentColor" />
                    </button>
                    
                    <button 
                      onClick={() => {
                        handleAddToCart(selectedProduct);
                        closeZoom();
                      }}
                      className="bg-amber-600 text-white px-3 py-2 text-sm font-medium hover:bg-amber-700 transition-all duration-300 flex items-center gap-1 rounded transform hover:scale-105"
                    >
                      <Plus className="w-4 h-4" />
                      Ajouter
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-in {
          animation: scaleIn 0.3s ease-out;
        }
        .line-clamp-1 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
        }
        .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
      `}</style>
    </div>
  );
};

export default Favoris;