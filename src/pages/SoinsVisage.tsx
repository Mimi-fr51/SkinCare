// src/pages/SoinsVisage.tsx
import { useState } from 'react';
import { Heart, ZoomIn, Plus, X, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface Product {
  id: number;
  name: string;
  brand: string;
  description: string;
  originalPrice: number;
  salePrice: number;
  image: string;
  category: string;
  rating: number;
  isFavorite: boolean;
}

const SoinsVisage = () => {
  const { addToCart, cartItems } = useCart();
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Hydratuxe Serum",
      brand: "AquaAura Wellness",
      description: "Sérum hydratant intense avec des ingrédients naturels pour une peau rayonnante et hydratée. Formule enrichie en acide hyaluronique.",
      originalPrice: 46.00,
      salePrice: 20.00,
      image: "/images/pexels-yaazhini-18992757.jpg",
      category: "Skin Care",
      rating: 4.9,
      isFavorite: false
    },
    {
      id: 2,
      name: "OceanMist Moisturizer",
      brand: "Velvet Rose",
      description: "Crème hydratante légère avec extraits d'algues marines pour une hydratation 24h. Texture non grasse.",
      originalPrice: 40.00,
      salePrice: 20.00,
      image: "/images/pexels-valeriiamiller-3680203.jpg",
      category: "Skin Care",
      rating: 4.8,
      isFavorite: false
    },
    {
      id: 3,
      name: "Essence Body Gel",
      brand: "Herbal Haven",
      description: "Gel corps essentiel avec extraits de plantes pour une peau douce et nourrie. Absorption rapide.",
      originalPrice: 60.00,
      salePrice: 30.00,
      image: "/images/pexels-vuong-tran-499453382-17714764.jpg",
      category: "Body Care",
      rating: 4.8,
      isFavorite: false
    },
    {
      id: 4,
      name: "Nourishing Cream",
      brand: "AquaAura Wellness",
      description: "Crème nourrissante riche en vitamines pour une peau revitalisée. Idéale pour les peaux sèches.",
      originalPrice: 50.00,
      salePrice: 25.00,
      image: "/images/pexels-polina-kovaleva-5927888.jpg",
      category: "Skin Care",
      rating: 5.0,
      isFavorite: false
    },
    {
      id: 5,
      name: "Gentle Cleanser",
      brand: "Velvet Rose",
      description: "Nettoyant doux qui respecte le pH naturel de la peau. Sans savon, sans alcool.",
      originalPrice: 35.00,
      salePrice: 17.50,
      image: "/images/pexels-yaazhini-18992757.jpg",
      category: "Skin Care",
      rating: 4.7,
      isFavorite: false
    },
    {
      id: 6,
      name: "Revitalizing Toner",
      brand: "Herbal Haven",
      description: "Tonique revitalisant aux extraits de rose pour un teint frais. Purifie et resserre les pores.",
      originalPrice: 45.00,
      salePrice: 22.50,
      image: "/images/pexels-valeriiamiller-3680203.jpg",
      category: "Skin Care",
      rating: 4.9,
      isFavorite: false
    }
  ]);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showZoom, setShowZoom] = useState(false);

  const isInCart = (productId: number) => {
    return cartItems.some(item => item.name === products.find(p => p.id === productId)?.name);
  };

  const toggleFavorite = (productId: number) => {
    setProducts(products.map(product => 
      product.id === productId 
        ? { ...product, isFavorite: !product.isFavorite }
        : product
    ));
  };

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

  return (
    <div className="min-h-screen bg-amber-50">
      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-1/4">
              <div className="relative rounded-lg overflow-hidden shadow-lg h-[600px] group">
                <img 
                  src="/images/pexels-polina-kovaleva-5928039.jpg" 
                  alt="Promotion 50% Off"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  style={{ objectPosition: 'center' }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-amber-900/50 to-amber-800/70 flex flex-col items-center justify-center p-6 text-white">
                  <div className="text-6xl font-bold mb-4 transform group-hover:scale-110 transition-transform duration-300">50% Off</div>
                  <div className="text-2xl font-semibold mb-8">16 JAN - 20 JAN</div>
                  <button className="bg-amber-600 text-white px-10 py-4 font-bold hover:bg-amber-700 transition-all duration-300 rounded-lg transform hover:scale-105 shadow-lg">
                    SHOP NOW
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:w-3/4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product) => (
                  <div 
                    key={product.id}
                    className="bg-white border border-amber-200 rounded-lg overflow-hidden group hover:shadow-lg transition-all duration-300 hover:border-amber-300"
                  >
                    <div className="relative overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      
                      <div className="absolute top-2 left-2">
                        <span className="bg-amber-600 text-white px-2 py-1 rounded text-xs font-bold shadow-lg">
                          50% OFF
                        </span>
                      </div>
                      
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                        <div className="transform translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex gap-2">
                          <button 
                            onClick={() => handleZoom(product)}
                            className="bg-white p-2 rounded-full shadow-lg hover:bg-amber-50 transition-all duration-200 transform hover:scale-110"
                          >
                            <ZoomIn className="w-4 h-4 text-amber-700" />
                          </button>
                          
                          <button 
                            onClick={() => toggleFavorite(product.id)}
                            className={`p-2 rounded-full shadow-lg transition-all duration-200 transform hover:scale-110 ${
                              product.isFavorite 
                                ? 'bg-amber-600 text-white' 
                                : 'bg-white text-amber-700 hover:bg-amber-50'
                            }`}
                          >
                            <Heart className="w-4 h-4" fill={product.isFavorite ? "currentColor" : "none"} />
                          </button>
                        </div>
                      </div>

                      <button 
                        id={`add-btn-${product.id}`}
                        onClick={() => handleAddToCart(product.id)}
                        className={`absolute bottom-2 right-2 w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-110 ${
                          isInCart(product.id)
                            ? 'bg-green-500 text-white'
                            : 'bg-amber-600 text-white hover:bg-amber-700'
                        }`}
                      >
                        {isInCart(product.id) ? '✓' : <Plus className="w-4 h-4" />}
                      </button>
                    </div>

                    <div className="p-3 bg-gradient-to-b from-white to-amber-50">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-amber-800 bg-amber-100 px-2 py-1 rounded">
                          {product.category}
                        </span>
                        {renderStars(product.rating)}
                      </div>
                      
                      <h3 className="text-sm font-semibold text-amber-900 mb-1 line-clamp-1">{product.name}</h3>
                      <p className="text-xs text-amber-700 mb-2 line-clamp-1">{product.brand}</p>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold text-amber-800">${product.salePrice.toFixed(2)}</span>
                        <span className="text-sm text-amber-600 line-through">${product.originalPrice.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

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
                    50% OFF
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
                    <span className="font-medium text-amber-900 text-xs">Soin Visage</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-amber-200">
                    <span className="text-amber-600 text-xs">Peau</span>
                    <span className="font-medium text-amber-900 text-xs">Tous types</span>
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
                    <span className="text-lg font-bold text-amber-800">${selectedProduct.salePrice.toFixed(2)}</span>
                    <span className="text-sm text-amber-600 line-through">${selectedProduct.originalPrice.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={() => toggleFavorite(selectedProduct.id)}
                      className={`p-2 rounded border transition-all duration-200 transform hover:scale-110 ${
                        selectedProduct.isFavorite 
                          ? 'bg-amber-600 text-white border-amber-600' 
                          : 'bg-white text-amber-700 border-amber-300 hover:border-amber-600'
                      }`}
                    >
                      <Heart className="w-4 h-4" fill={selectedProduct.isFavorite ? "currentColor" : "none"} />
                    </button>
                    
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
      `}</style>
    </div>
  );
};

export default SoinsVisage;