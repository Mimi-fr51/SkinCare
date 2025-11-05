// src/pages/Nouveautes.tsx
import { useState, useEffect } from 'react';
import { Heart, Star, ShoppingCart, Search, Filter, ZoomIn, Plus, X, ArrowRight, Calendar } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface Product {
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
  isNew: boolean;
  releaseDate: string;
}

const Nouveautes = () => {
  const { addToCart, cartItems } = useCart();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showZoom, setShowZoom] = useState(false);
  const [favorites, setFavorites] = useState<Product[]>([]);

  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Serum Éclat Vitamine C",
      brand: "Lumière Naturelle",
      description: "Nouveau sérum illuminant à la vitamine C pure. Texture légère qui pénètre rapidement pour un teint radieux et unifié. Anti-oxydant et anti-âge.",
      discount: "25",
      originalPrice: 45.00,
      salePrice: 33.99,
      image: "/images/pexels-sueda-gln-327513956-28255122.jpg",
      rating: 4.9,
      isFavorite: false,
      category: "Soin Visage",
      isNew: true,
      releaseDate: "2024-01-15"
    },
    {
      id: 2,
      name: "Palette Maquillage Pastel",
      brand: "Color Dreams",
      description: "Nouvelle collection pastel avec des pigments haute intensité. Textures matte et nacrée pour des looks créatifs et tendance.",
      discount: "30",
      originalPrice: 52.00,
      salePrice: 36.99,
      image: "/images/pexels-828860-2639947.jpg",
      rating: 4.7,
      isFavorite: false,
      category: "Maquillage",
      isNew: true,
      releaseDate: "2024-01-10"
    },
    {
      id: 3,
      name: "Crème Hydratante CBD",
      brand: "Cannabis Beauty",
      description: "Innovation beauté avec extrait de CBD bio. Apaise les peaux sensibles et réduit les rougeurs. Texture riche mais non grasse.",
      discount: "20",
      originalPrice: 38.00,
      salePrice: 29.99,
      image: "/images/pexels-anastasiia-melnykova-158522451-10756338.jpg",
      rating: 4.8,
      isFavorite: false,
      category: "Soin Visage",
      isNew: true,
      releaseDate: "2024-01-08"
    },
    {
      id: 4,
      name: "Mascara Volume Extrême",
      brand: "Lash Revolution",
      description: "Nouvelle formule waterproof qui donne un volume immédiat sans paquets. Brosse innovante pour séparation parfaite des cils.",
      discount: "15",
      originalPrice: 28.00,
      salePrice: 23.99,
      image: "/images/pexels-sairam-rasa-587546-20499753.jpg",
      rating: 4.6,
      isFavorite: false,
      category: "Maquillage",
      isNew: true,
      releaseDate: "2024-01-12"
    },
    {
      id: 5,
      name: "Huile Sèche Corps",
      brand: "Dry Touch",
      description: "Nouvelle texture huile sèche qui nourrit la peau sans effet gras. Absorption instantanée avec fini satiné.",
      discount: "22",
      originalPrice: 42.00,
      salePrice: 32.99,
      image: "/images/pexels-pnw-prod-8490234.jpg",
      rating: 4.9,
      isFavorite: false,
      category: "Soin Corps",
      isNew: true,
      releaseDate: "2024-01-05"
    },
    {
      id: 6,
      name: "Baume à Lèvres Réparateur",
      brand: "Lip Therapy",
      description: "Soin intensif pour lèvres gercées avec céramides et acide hyaluronique. Effet immédiat et durable.",
      discount: "18",
      originalPrice: 24.00,
      salePrice: 19.99,
      image: "/images/pexels-vitalyagorbachev-26927323.jpg",
      rating: 4.7,
      isFavorite: false,
      category: "Soin Visage",
      isNew: true,
      releaseDate: "2024-01-18"
    },
    {
      id: 7,
      name: "Spray Texturisant Cheveux",
      brand: "Hair Volume",
      description: "Nouveau spray qui donne du volume et de la texture sans alourdir. Effet naturel et tenue longue durée.",
      discount: "25",
      originalPrice: 32.00,
      salePrice: 23.99,
      image: "/images/pexels-laurencuddy-20523085.jpg",
      rating: 4.5,
      isFavorite: false,
      category: "Soin Cheveux",
      isNew: true,
      releaseDate: "2024-01-03"
    },
    {
      id: 8,
      name: "Gel Douche Parfumé",
      brand: "Scented Moments",
      description: "Nouvelle gamme de gels douche aux fragrances sophistiquées. Mousse riche et peau douce après la douche.",
      discount: "20",
      originalPrice: 18.00,
      salePrice: 14.99,
      image: "/images/pexels-mearlywan-307951439-16378445.jpg",
      rating: 4.8,
      isFavorite: false,
      category: "Soin Corps",
      isNew: true,
      releaseDate: "2024-01-20"
    }
  ]);

  // Charger les favoris depuis le localStorage au montage du composant
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      const favoriteProducts = JSON.parse(savedFavorites);
      setFavorites(favoriteProducts);
      
      // Mettre à jour l'état isFavorite des produits
      setProducts(prevProducts => 
        prevProducts.map(product => ({
          ...product,
          isFavorite: favoriteProducts.some((fav: Product) => fav.id === product.id)
        }))
      );
    }
  }, []);

  // Sauvegarder les favoris dans le localStorage à chaque changement
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (productId: number) => {
    const productToToggle = products.find(product => product.id === productId);
    if (!productToToggle) return;

    setProducts(products.map(product => 
      product.id === productId 
        ? { ...product, isFavorite: !product.isFavorite }
        : product
    ));

    if (productToToggle.isFavorite) {
      // Retirer des favoris
      setFavorites(favorites.filter(product => product.id !== productId));
    } else {
      // Ajouter aux favoris
      setFavorites([...favorites, { ...productToToggle, isFavorite: true }]);
    }

    // Mettre à jour aussi le produit sélectionné s'il est ouvert dans le modal
    if (selectedProduct && selectedProduct.id === productId) {
      setSelectedProduct({
        ...selectedProduct,
        isFavorite: !selectedProduct.isFavorite
      });
    }
  };

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

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || product.category === filter;
    return matchesSearch && matchesFilter;
  });

  const categories = ['all', 'Soin Visage', 'Maquillage', 'Soin Corps', 'Soin Cheveux'];

  const isInCart = (productName: string) => {
    return cartItems.some(item => item.name === productName);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Header avec Vidéo */}
      <header className="relative h-screen flex items-center overflow-hidden">
        {/* Vidéo de fond */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute z-0 w-auto min-w-full min-h-full max-w-none object-cover"
        >
          <source src="/videos/beauty-video.mp4" type="video/mp4" />
          Votre navigateur ne supporte pas la lecture de vidéos.
        </video>

        {/* Contenu à gauche */}
        <div className="relative z-20 text-left px-8 md:px-16 lg:px-24 max-w-2xl">
          {/* Titre principal avec taille réduite */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif text-amber-900 leading-tight mb-4">
            <span className="block font-light">NOUVEAUTÉS</span>
            <span className="block font-light italic text-lg md:text-xl">Découvrez les dernières</span>
            <span className="block font-semibold mt-1 text-amber-800">innovations beauté</span>
          </h1>

          {/* Sous-titre */}
          <div className="mb-6 max-w-lg">
            <p className="text-sm text-amber-800 font-light leading-relaxed mb-4">
              Soyez les premiers à tester nos dernières nouveautés. Des produits innovants 
              et tendance qui révolutionnent votre routine beauté.
            </p>
          </div>

          {/* Badge Nouveauté */}
          <div className="flex items-center gap-2 bg-amber-600 text-white px-4 py-2 rounded-full w-fit">
            <Calendar className="w-4 h-4" />
            <span className="text-sm font-medium">Nouveaux produits ajoutés chaque semaine</span>
          </div>
        </div>
      </header>

      {/* Filtres et Recherche */}
      <div className="bg-white border-b border-amber-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
            <div className="flex items-center gap-3">
              <Filter className="w-4 h-4 text-amber-600" />
              <div className="flex flex-wrap gap-1">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setFilter(category)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                      filter === category
                        ? 'bg-amber-600 text-white'
                        : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                    }`}
                  >
                    {category === 'all' ? 'Toutes' : category}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="relative w-full md:w-56">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-400 w-3 h-3" />
              <input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-1 text-sm border border-amber-300 rounded-lg focus:ring-1 focus:ring-amber-500 focus:border-amber-500 bg-amber-50 outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section Nouveautés */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-amber-900 mb-3">Dernières Sorties</h2>
          <p className="text-sm text-amber-600 max-w-2xl mx-auto">
            Découvrez nos produits les plus récents avec des promotions exclusives réservées aux premiers acheteurs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <div 
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-all duration-300 border border-amber-200 relative"
            >
              {/* Badge Nouveauté */}
              <div className="absolute top-2 right-2 z-10">
                <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-md flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  NOUVEAU
                </span>
              </div>

              <div className="relative overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Badge Réduction */}
                <div className="absolute top-2 left-2">
                  <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-md">
                    -{product.discount}%
                  </span>
                </div>

                {/* Boutons d'action */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <div className="transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex gap-1">
                    <button 
                      onClick={() => handleZoom(product)}
                      className="bg-white p-1 rounded-full shadow-md hover:bg-amber-50 transition-all duration-200 transform hover:scale-110"
                    >
                      <ZoomIn className="w-3 h-3 text-amber-700" />
                    </button>
                    
                    <button 
                      onClick={() => toggleFavorite(product.id)}
                      className={`p-1 rounded-full shadow-md transition-all duration-200 transform hover:scale-110 ${
                        product.isFavorite 
                          ? 'bg-red-500 text-white' 
                          : 'bg-white text-amber-700 hover:bg-amber-50'
                      }`}
                    >
                      <Heart 
                        className="w-3 h-3" 
                        fill={product.isFavorite ? "currentColor" : "none"} 
                      />
                    </button>
                  </div>
                </div>

                {/* Bouton Ajouter au Panier */}
                <button 
                  onClick={() => handleAddToCart(product)}
                  className={`absolute bottom-2 right-2 w-6 h-6 rounded-full flex items-center justify-center shadow-md transition-all duration-300 transform hover:scale-110 ${
                    isInCart(product.name)
                      ? 'bg-green-500 text-white'
                      : 'bg-amber-600 text-white hover:bg-amber-700'
                  }`}
                >
                  {isInCart(product.name) ? '✓' : <ShoppingCart className="w-3 h-3" />}
                </button>
              </div>

              <div className="p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-amber-800 bg-amber-100 px-2 py-1 rounded">
                    {product.category}
                  </span>
                  {renderStars(product.rating)}
                </div>

                <h3 className="font-bold text-amber-900 text-sm mb-1 line-clamp-1">{product.name}</h3>
                <p className="text-xs text-amber-700 mb-1 line-clamp-1">{product.brand}</p>
                <p className="text-amber-600 text-xs mb-2 line-clamp-2">{product.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="text-base font-bold text-amber-800">{product.salePrice.toFixed(2)} €</span>
                    <span className="text-xs text-amber-600 line-through">{product.originalPrice.toFixed(2)} €</span>
                  </div>
                  <div className="flex items-center gap-1 text-amber-500 text-xs">
                    <Calendar className="w-3 h-3" />
                    {formatDate(product.releaseDate)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-8">
            <p className="text-amber-500 text-sm">Aucun produit trouvé correspondant à vos critères.</p>
          </div>
        )}
      </div>

      {/* Modal Zoom */}
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
                  <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    NOUVEAU
                  </span>
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
                    <span className="font-medium text-green-600 text-xs">Nouveauté</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-3 border-t border-amber-200">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-amber-800">{selectedProduct.salePrice.toFixed(2)} €</span>
                    <span className="text-sm text-amber-600 line-through">{selectedProduct.originalPrice.toFixed(2)} €</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={() => toggleFavorite(selectedProduct.id)}
                      className={`p-2 rounded border transition-all duration-200 transform hover:scale-110 ${
                        selectedProduct.isFavorite 
                          ? 'bg-red-500 text-white border-red-500' 
                          : 'bg-white text-amber-700 border-amber-300 hover:border-amber-600'
                      }`}
                    >
                      <Heart 
                        className="w-4 h-4" 
                        fill={selectedProduct.isFavorite ? "currentColor" : "none"} 
                      />
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

      {/* Section Avantages Nouveautés */}
      <div className="bg-gradient-to-r from-amber-900 to-amber-700 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-amber-200 mb-1">Premier</div>
              <div className="text-amber-100 text-sm">Soyez parmi les premiers à tester</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-200 mb-1">Exclusif</div>
              <div className="text-amber-100 text-sm">Promotions réservées aux nouveautés</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-200 mb-1">Innovant</div>
              <div className="text-amber-100 text-sm">Technologies et formules dernières générations</div>
            </div>
          </div>
        </div>
      </div>

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

export default Nouveautes;