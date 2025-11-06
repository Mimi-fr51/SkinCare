import { useState } from 'react';
import { ZoomIn, Plus, X, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import HeartButton from '../components/HeartButton';

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
  isNew: boolean;
  releaseDate: string;
  discount: string;
}

const Maquillage = () => {
  const { addToCart, cartItems } = useCart();
  const navigate = useNavigate();
  
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Rouge à Lèvres Mat",
      brand: "Maram Beauty",
      description: "Rouge à lèvres mat longue tenue avec formule hydratante. Couleur intense qui dure toute la journée sans sécher les lèvres.",
      originalPrice: 32.00,
      salePrice: 16.00,
      image: "/images/pexels-walaa-dag-218036224-11883768.jpg",
      category: "Maquillage",
      rating: 4.8,
      isNew: true,
      releaseDate: "2024-01-25",
      discount: "50"
    },
    {
      id: 2,
      name: "Fond de Teint Liquide",
      brand: "Maram Beauty",
      description: "Fond de teint liquide couvrant avec fini naturel. Texture légère qui unifie le teint et cache les imperfections.",
      originalPrice: 45.00,
      salePrice: 22.50,
      image: "/images/pexels-karola-g-4938201.jpg",
      category: "Maquillage",
      rating: 4.7,
      isNew: false,
      releaseDate: "2024-01-20",
      discount: "50"
    },
    {
      id: 3,
      name: "Palette Fards à Paupières",
      brand: "Maram Beauty",
      description: "Palette de fards à paupières avec 12 nuances mat et scintillantes. Pigmentation intense et texture facile à blend.",
      originalPrice: 58.00,
      salePrice: 29.00,
      image: "/images/pexels-aditi-ahalawat-2062245-6233289.jpg",
      category: "Maquillage",
      rating: 4.9,
      isNew: true,
      releaseDate: "2024-01-30",
      discount: "50"
    },
    {
      id: 4,
      name: "Mascara Volume",
      brand: "Maram Beauty",
      description: "Mascara volume intense qui allonge et courbe les cils sans les empâter. Résultat naturel et waterproof.",
      originalPrice: 28.00,
      salePrice: 14.00,
      image: "/images/pexels-828860-2688992.jpg",
      category: "Maquillage",
      rating: 4.6,
      isNew: false,
      releaseDate: "2024-01-15",
      discount: "50"
    },
    {
      id: 5,
      name: "Palette Blush",
      brand: "Maram Beauty",
      description: "Palette blush avec 4 nuances rosées pour un teint frais et naturel. Texture powder-cream pour un fini satiné.",
      originalPrice: 35.00,
      salePrice: 17.50,
      image: "/images/pexels-amazingsobia-5420688.jpg",
      category: "Maquillage",
      rating: 4.8,
      isNew: true,
      releaseDate: "2024-02-01",
      discount: "50"
    },
    {
      id: 6,
      name: "Highlighter Lumière",
      brand: "Maram Beauty",
      description: "Highlighter nacré pour un éclat naturel. Texture légère qui illumine les points stratégiques du visage.",
      originalPrice: 26.00,
      salePrice: 13.00,
      image: "/images/pexels-alena-chuyankova-280716561-18978369.jpg",
      category: "Maquillage",
      rating: 4.7,
      isNew: false,
      releaseDate: "2024-01-18",
      discount: "50"
    }
  ]);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showZoom, setShowZoom] = useState(false);

  const isInCart = (productId: number) => {
    return cartItems.some(item => item.name === products.find(p => p.id === productId)?.name);
  };

  const handleAddToCart = (productId: number) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    addToCart({
      id: product.id.toString(), // CORRECTION : Ajout de l'id
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

  const handleShopNow = () => {
    navigate('/marques');
  };

  return (
    <div className="min-h-screen bg-amber-50">
      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-1/4">
              <div className="relative rounded-lg overflow-hidden shadow-lg h-[600px] group">
                <img 
                  src="/images/pexels-tetiana-androshchuk-1524362819-27799695.jpg" 
                  alt="Promotion 50% Off"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  style={{ objectPosition: 'center' }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-amber-900/50 to-amber-800/70 flex flex-col items-center justify-center p-6 text-white">
                  <div className="text-6xl font-bold mb-4 transform group-hover:scale-110 transition-transform duration-300">50% Off</div>
                  <div className="text-2xl font-semibold mb-8">16 JAN - 20 JAN</div>
                  <button 
                    onClick={handleShopNow}
                    className="bg-amber-600 text-white px-10 py-4 font-bold hover:bg-amber-700 transition-all duration-300 rounded-lg transform hover:scale-105 shadow-lg"
                  >
                    ACHETER MAINTENANT
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
                          -50%
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
                          
                          <HeartButton 
                            product={product}
                            size="sm"
                            className="bg-white p-2 rounded-full shadow-lg hover:bg-amber-50"
                          />
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
                        <span className="text-base font-bold text-amber-800">{product.salePrice.toFixed(2)} €</span>
                        <span className="text-sm text-amber-600 line-through">{product.originalPrice.toFixed(2)} €</span>
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
                    -50%
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
                    <span className="font-medium text-amber-900 text-xs">Maquillage</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-amber-200">
                    <span className="text-amber-600 text-xs">Texture</span>
                    <span className="font-medium text-amber-900 text-xs">Légère</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-amber-200">
                    <span className="text-amber-600 text-xs">Volume</span>
                    <span className="font-medium text-amber-900 text-xs">Selon produit</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-amber-200">
                    <span className="text-amber-600 text-xs">Tenue</span>
                    <span className="font-medium text-amber-900 text-xs">Longue durée</span>
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

export default Maquillage;