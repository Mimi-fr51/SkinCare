import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Products: React.FC = () => {
  const navigate = useNavigate();
  const { addToCart, getTotalItems } = useCart();

  const products = [
    {
      name: "Sérum Hydratant",
      description: "Hydratation intense 24h",
      price: "45,00€",
      image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
    },
    {
      name: "Crème de Nuit",
      description: "Régénération cellulaire",
      price: "52,00€",
      image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
    },
    {
      name: "Nettoyant Doux",
      description: "Purification en douceur",
      price: "28,00€", 
      image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
    },
    {
      name: "Masque Éclat",
      description: "Éclat immédiat",
      price: "38,00€",
      image: "/pexels-polina-kovaleva-5927890.jpg"
    }
  ];

  const handleAddToCart = (product: any, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    
    // Animation de confirmation
    const button = e.currentTarget as HTMLButtonElement;
    button.classList.add('bg-green-500');
    setTimeout(() => {
      button.classList.remove('bg-green-500');
    }, 300);
  };

  const handleProductClick = () => {
    navigate('/soins-visage');
  };

  const handleViewCollection = () => {
    navigate('/nouveautes');
  };

  return (
    <section className="py-20 bg-amber-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-amber-900 mb-4">
            Nos Produits Phares
          </h2>
          <p className="text-amber-700/80 max-w-2xl mx-auto font-light">
            Des formulations naturelles et efficaces pour prendre soin de votre peau au quotidien
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div 
              key={product.name}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 group cursor-pointer"
              style={{ animationDelay: `${index * 200}ms` }}
              onClick={handleProductClick}
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {product.name === "Masque Éclat" && (
                  <span className="absolute top-2 left-2 bg-rose-500 text-white px-2 py-1 text-xs font-bold rounded-full animate-pulse">
                    Nouveau
                  </span>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="font-serif text-amber-900 text-lg mb-2">{product.name}</h3>
                <p className="text-amber-700/70 text-sm font-light mb-4">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-amber-800 font-bold text-lg">{product.price}</span>
                  <button 
                    onClick={(e) => handleAddToCart(product, e)}
                    className="bg-amber-800 text-white p-2 rounded-full hover:bg-amber-900 transition-all duration-300 transform hover:scale-110 group/button"
                    title="Ajouter au panier"
                  >
                    <svg className="w-4 h-4 transform group-hover/button:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button 
            onClick={handleViewCollection}
            className="border border-amber-800 text-amber-800 px-8 py-3 text-sm font-medium tracking-wider hover:bg-amber-800 hover:text-white transition-all duration-500 transform hover:scale-105"
          >
            Voir toute la collection
          </button>
        </div>
      </div>
    </section>
  );
};

export default Products;