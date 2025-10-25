// src/pages/Marques.tsx
import { useState, useEffect } from 'react';
import { Heart, Star, ShoppingCart, Search, Filter, ZoomIn, Plus, X, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

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

const Marques = () => {
  const { addToCart, cartItems } = useCart();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [showZoom, setShowZoom] = useState(false);

  const [brands, setBrands] = useState<Brand[]>([
    {
      id: 1,
      name: "Cosmetic Skin Perfectly",
      brand: "SkinCare Elite",
      description: "Soins naturels à base d'extraits d'aloe vera pour une peau radieuse. Formule enrichie en antioxydants et vitamines pour une hydratation profonde et durable.",
      discount: "278",
      originalPrice: 89.00,
      salePrice: 64.99,
      image: "/images/pexels-hype-international-395825114-14798327.jpg",
      rating: 4.8,
      isFavorite: false,
      category: "Soin Visage"
    },
    {
      id: 2,
      name: "Updated Skin Perfectly",
      brand: "Derma Plus",
      description: "Formule avancée pour une texture et un teint de peau parfaits. Convient à tous les types de peau, même les plus sensibles.",
      discount: "200",
      originalPrice: 75.00,
      salePrice: 49.99,
      image: "/images/pexels-itslauravillela-29022722.jpg",
      rating: 4.6,
      isFavorite: false,
      category: "Soin Visage"
    },
    {
      id: 3,
      name: "Beauty Box by Black",
      brand: "Luxury Cosmetics",
      description: "Collection beauté premium avec des ingrédients biologiques. Packaging élégant et produits haute performance.",
      discount: "150",
      originalPrice: 120.00,
      salePrice: 89.99,
      image: "/images/pexels-anastasiia-melnykova-158522451-10756338.jpg",
      rating: 4.9,
      isFavorite: false,
      category: "Maquillage"
    },
    {
      id: 4,
      name: "Natural Air Base System",
      brand: "Air Beauty",
      description: "Fond de teint léger avec technologie air-whipped pour une couverture naturelle et une texture imperceptible.",
      discount: "125",
      originalPrice: 65.00,
      salePrice: 45.99,
      image: "/images/pexels-janakukebal-6689393.jpg",
      rating: 4.7,
      isFavorite: false,
      category: "Maquillage"
    },
    {
      id: 5,
      name: "La Rue des Chats System",
      brand: "Paris Beauty",
      description: "Soins luxueux français avec extraits naturels de rose et de lavande. L'élégance française à son meilleur.",
      discount: "180",
      originalPrice: 95.00,
      salePrice: 69.99,
      image: "/images/pexels-monirathnak-14836428.jpg",
      rating: 4.8,
      isFavorite: false,
      category: "Soin Visage"
    },
    {
      id: 6,
      name: "Hans Swann Lake System",
      brand: "Swiss Precision",
      description: "Précision suisse dans la formulation des soins. Technologies avancées pour des résultats visibles.",
      discount: "220",
      originalPrice: 110.00,
      salePrice: 79.99,
      image: "/images/pexels-monirathnak-24602077.jpg",
      rating: 4.9,
      isFavorite: false,
      category: "Soin Visage"
    },
    {
      id: 7,
      name: "Ashley Blue River Train",
      brand: "Organic Nature",
      description: "Produits beauté biologiques de sources naturelles. 100% naturels et respectueux de l'environnement.",
      discount: "160",
      originalPrice: 85.00,
      salePrice: 59.99,
      image: "/images/pexels-laurencuddy-20523085.jpg",
      rating: 4.5,
      isFavorite: false,
      category: "Soin Corps"
    },
    {
      id: 8,
      name: "Alex Smith Red Oak System",
      brand: "Professional Care",
      description: "Soins professionnels pour tous types de peau. Développés avec des dermatologues pour une efficacité maximale.",
      discount: "195",
      originalPrice: 78.00,
      salePrice: 54.99,
      image: "/images/pexels-mearlywan-307951439-16378445.jpg",
      rating: 4.7,
      isFavorite: false,
      category: "Soin Visage"
    }
  ]);

  const toggleFavorite = (brandId: number) => {
    setBrands(brands.map(brand => 
      brand.id === brandId 
        ? { ...brand, isFavorite: !brand.isFavorite }
        : brand
    ));
  };

  const handleAddToCart = (brand: Brand) => {
    addToCart({
      name: brand.name,
      price: brand.salePrice.toFixed(2),
      image: brand.image
    });
  };

  const handleZoom = (brand: Brand) => {
    setSelectedBrand(brand);
    setShowZoom(true);
  };

  const closeZoom = () => {
    setShowZoom(false);
    setTimeout(() => setSelectedBrand(null), 300);
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

  const filteredBrands = brands.filter(brand => {
    const matchesSearch = brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         brand.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || brand.category === filter;
    return matchesSearch && matchesFilter;
  });

  const categories = ['all', 'Soin Visage', 'Maquillage', 'Soin Corps', 'Vegan', 'Naturel'];

  const isInCart = (brandName: string) => {
    return cartItems.some(item => item.name === brandName);
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
            <span className="block font-light">NOS MARQUES</span>
            <span className="block font-light italic text-lg md:text-xl">Découvrez l'excellence</span>
            <span className="block font-semibold mt-1 text-amber-800">beauté</span>
          </h1>

          {/* Sous-titre */}
          <div className="mb-6 max-w-lg">
            <p className="text-sm text-amber-800 font-light leading-relaxed mb-4">
              Explorez notre sélection exclusive des meilleures marques de cosmétiques et soins beauté, 
              toutes soigneusement choisies pour leur qualité et leur efficacité.
            </p>
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
                placeholder="Rechercher une marque..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-1 text-sm border border-amber-300 rounded-lg focus:ring-1 focus:ring-amber-500 focus:border-amber-500 bg-amber-50 outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section Marques Tendances */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-amber-900 mb-3">Marques Tendances</h2>
          <p className="text-sm text-amber-600 max-w-2xl mx-auto">
            Découvrez nos marques les plus populaires avec des promotions exclusives
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredBrands.map((brand) => (
            <div 
              key={brand.id}
              className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-all duration-300 border border-amber-200"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={brand.image} 
                  alt={brand.name}
                  className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Badge Réduction */}
                <div className="absolute top-2 left-2">
                  <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-md">
                    -{brand.discount} €
                  </span>
                </div>

                {/* Boutons d'action */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <div className="transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex gap-1">
                    <button 
                      onClick={() => handleZoom(brand)}
                      className="bg-white p-1 rounded-full shadow-md hover:bg-amber-50 transition-all duration-200 transform hover:scale-110"
                    >
                      <ZoomIn className="w-3 h-3 text-amber-700" />
                    </button>
                    
                    <button 
                      onClick={() => toggleFavorite(brand.id)}
                      className={`p-1 rounded-full shadow-md transition-all duration-200 transform hover:scale-110 ${
                        brand.isFavorite 
                          ? 'bg-amber-600 text-white' 
                          : 'bg-white text-amber-700 hover:bg-amber-50'
                      }`}
                    >
                      <Heart className="w-3 h-3" fill={brand.isFavorite ? "currentColor" : "none"} />
                    </button>
                  </div>
                </div>

                {/* Bouton Ajouter au Panier */}
                <button 
                  onClick={() => handleAddToCart(brand)}
                  className={`absolute bottom-2 right-2 w-6 h-6 rounded-full flex items-center justify-center shadow-md transition-all duration-300 transform hover:scale-110 ${
                    isInCart(brand.name)
                      ? 'bg-green-500 text-white'
                      : 'bg-amber-600 text-white hover:bg-amber-700'
                  }`}
                >
                  {isInCart(brand.name) ? '✓' : <ShoppingCart className="w-3 h-3" />}
                </button>
              </div>

              <div className="p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-amber-800 bg-amber-100 px-2 py-1 rounded">
                    {brand.category}
                  </span>
                  {renderStars(brand.rating)}
                </div>

                <h3 className="font-bold text-amber-900 text-sm mb-1 line-clamp-1">{brand.name}</h3>
                <p className="text-xs text-amber-700 mb-1 line-clamp-1">{brand.brand}</p>
                <p className="text-amber-600 text-xs mb-2 line-clamp-2">{brand.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="text-base font-bold text-amber-800">{brand.salePrice.toFixed(2)} €</span>
                    <span className="text-xs text-amber-600 line-through">{brand.originalPrice.toFixed(2)} €</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredBrands.length === 0 && (
          <div className="text-center py-8">
            <p className="text-amber-500 text-sm">Aucune marque trouvée correspondant à vos critères.</p>
          </div>
        )}
      </div>

      {/* Modal Zoom */}
      {showZoom && selectedBrand && (
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
                  src={selectedBrand.image} 
                  alt={selectedBrand.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-2 left-2">
                  <span className="bg-amber-600 text-white px-2 py-1 rounded text-xs font-bold">
                    -{selectedBrand.discount} €
                  </span>
                </div>
              </div>
              
              <div className="p-4 flex flex-col justify-center">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-amber-800 bg-amber-100 px-2 py-1 rounded">
                    {selectedBrand.category}
                  </span>
                  {renderStars(selectedBrand.rating)}
                </div>

                <h2 className="text-lg font-bold text-amber-900 mb-1">{selectedBrand.name}</h2>
                <p className="text-sm text-amber-700 mb-3">{selectedBrand.brand}</p>
                
                <p className="text-amber-600 text-sm mb-4 leading-relaxed">{selectedBrand.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between py-1 border-b border-amber-200">
                    <span className="text-amber-600 text-xs">Type</span>
                    <span className="font-medium text-amber-900 text-xs">{selectedBrand.category}</span>
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
                    <span className="text-amber-600 text-xs">Composition</span>
                    <span className="font-medium text-amber-900 text-xs">Naturelle</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-3 border-t border-amber-200">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-amber-800">{selectedBrand.salePrice.toFixed(2)} €</span>
                    <span className="text-sm text-amber-600 line-through">{selectedBrand.originalPrice.toFixed(2)} €</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={() => toggleFavorite(selectedBrand.id)}
                      className={`p-2 rounded border transition-all duration-200 transform hover:scale-110 ${
                        selectedBrand.isFavorite 
                          ? 'bg-amber-600 text-white border-amber-600' 
                          : 'bg-white text-amber-700 border-amber-300 hover:border-amber-600'
                      }`}
                    >
                      <Heart className="w-4 h-4" fill={selectedBrand.isFavorite ? "currentColor" : "none"} />
                    </button>
                    
                    <button 
                      onClick={() => {
                        handleAddToCart(selectedBrand);
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

      {/* Section Statistiques */}
      <div className="bg-gradient-to-r from-amber-900 to-amber-700 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-amber-200 mb-1">50+</div>
              <div className="text-amber-100 text-sm">Marques Premium</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-200 mb-1">10K+</div>
              <div className="text-amber-100 text-sm">Clients Satisfaits</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-200 mb-1">100%</div>
              <div className="text-amber-100 text-sm">Garantie Qualité</div>
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

export default Marques;