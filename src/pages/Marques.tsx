// src/pages/Marques.tsx
import { useState, useEffect } from 'react';
import { Star, ShoppingCart, Search, Filter, ZoomIn, Plus, X, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import HeartButton from '../components/HeartButton';

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
  category: string;
  isNew: boolean;
  releaseDate: string;
}

const Marques = () => {
  const { addToCart, cartItems } = useCart();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showZoom, setShowZoom] = useState(false);

  const [products, setProducts] = useState<Product[]>([
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
      category: "Soin Visage",
      isNew: true,
      releaseDate: "2024-01-25"
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
      category: "Soin Visage",
      isNew: false,
      releaseDate: "2024-01-20"
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
      category: "Maquillage",
      isNew: true,
      releaseDate: "2024-01-30"
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
      category: "Maquillage",
      isNew: false,
      releaseDate: "2024-01-15"
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
      category: "Soin Visage",
      isNew: true,
      releaseDate: "2024-02-01"
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
      category: "Soin Visage",
      isNew: false,
      releaseDate: "2024-01-18"
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
      category: "Soin Corps",
      isNew: true,
      releaseDate: "2024-01-22"
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
      category: "Soin Visage",
      isNew: false,
      releaseDate: "2024-01-28"
    }
  ]);

  const handleAddToCart = (productId: number) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    addToCart({
      name: product.name,
      price: product.salePrice.toFixed(2),
      image: product.image
    });
    
    const button = document.getElementById(`add-btn-${productId}`);
    if (button) {
      button.classList.add('animate-bounce');
      setTimeout(() => button.classList.remove('animate-bounce'), 600);
    }

    console.log('Produit ajouté au panier!', product.name);
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

  const categories = ['all', 'Soin Visage', 'Maquillage', 'Soin Corps'];

  const isInCart = (productName: string) => {
    return cartItems.some(item => item.name === productName);
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
          {filteredProducts.map((product) => (
            <div 
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-all duration-300 border border-amber-200"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Badge Réduction */}
                <div className="absolute top-2 left-2">
                  <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-md">
                    -{product.discount} €
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
                    
                    <HeartButton 
                      product={product}
                      size="sm"
                      className="bg-white p-1 rounded-full shadow-md hover:bg-amber-50"
                    />
                  </div>
                </div>

                {/* Bouton Ajouter au Panier */}
                <button 
                  id={`add-btn-${product.id}`}
                  onClick={() => handleAddToCart(product.id)}
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
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-8">
            <p className="text-amber-500 text-sm">Aucune marque trouvée correspondant à vos critères.</p>
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
                <div className="absolute top-2 left-2">
                  <span className="bg-amber-600 text-white px-2 py-1 rounded text-xs font-bold">
                    -{selectedProduct.discount} €
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
                    <span className="text-amber-600 text-xs">Composition</span>
                    <span className="font-medium text-amber-900 text-xs">Naturelle</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-3 border-t border-amber-200">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-amber-800">{selectedProduct.salePrice.toFixed(2)} €</span>
                    <span className="text-sm text-amber-600 line-through">{selectedProduct.originalPrice.toFixed(2)} €</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <HeartButton 
                      product={selectedProduct}
                      size="sm"
                      className="bg-white p-2 rounded border border-amber-300 hover:border-amber-600"
                    />
                    
                    <button 
                      onClick={() => {
                        handleAddToCart(selectedProduct.id);
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