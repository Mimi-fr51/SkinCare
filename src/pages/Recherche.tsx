import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

// Mock data pour les produits de recherche
const mockProducts = [
  {
    id: 1,
    name: 'Crème Hydratante Visage',
    category: 'Soins Visage',
    price: 29.90,
    image: '/images/creme-hydratante.jpg',
    rating: 4.5,
    description: 'Crème hydratante intense pour une peau douce et nourrie'
  },
  {
    id: 2,
    name: 'Sérum Anti-Âge',
    category: 'Soins Visage',
    price: 45.90,
    image: '/images/serum-anti-age.jpg',
    rating: 4.8,
    description: 'Sérum repulpant aux actifs naturels'
  },
  {
    id: 3,
    name: 'Gel Douche Parfumé',
    category: 'Corps',
    price: 18.50,
    image: '/images/gel-douche.jpg',
    rating: 4.2,
    description: 'Gel douche au parfum frais et durable'
  },
  {
    id: 4,
    name: 'Rouge à Lèvres Matte',
    category: 'Maquillage',
    price: 24.90,
    image: '/images/rouge-levres.jpg',
    rating: 4.6,
    description: 'Rouge à lèvres mat longue tenue'
  }
];

const Recherche: React.FC = () => {
  const location = useLocation();
  const query = location.state?.query || '';
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('pertinence');

  useEffect(() => {
    // Simulation de recherche
    const performSearch = () => {
      setLoading(true);
      setTimeout(() => {
        if (query.trim()) {
          const filteredProducts = mockProducts.filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase())
          );
          setSearchResults(filteredProducts);
        } else {
          setSearchResults([]);
        }
        setLoading(false);
      }, 800);
    };

    performSearch();
  }, [query]);

  // Fonction de tri des résultats
  const sortedResults = [...searchResults].sort((a, b) => {
    switch (sortBy) {
      case 'prix-croissant':
        return a.price - b.price;
      case 'prix-decroissant':
        return b.price - a.price;
      case 'note':
        return b.rating - a.rating;
      case 'pertinence':
      default:
        return 0;
    }
  });

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            className={`w-4 h-4 ${index < Math.floor(rating) ? 'text-amber-400 fill-current' : 'text-amber-200'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="ml-1 text-amber-700 text-sm">({rating})</span>
      </div>
    );
  };

  return (
    <div className="pt-20 min-h-screen bg-amber-50">
      <div className="container mx-auto px-6 py-8">
        {/* En-tête de recherche */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-amber-900 mb-2">
            Résultats pour : "<span className="text-amber-700">{query}</span>"
          </h1>
          <p className="text-amber-600">
            {loading ? 'Recherche en cours...' : `${sortedResults.length} produit(s) trouvé(s)`}
          </p>
        </div>

        {/* Filtres et tri */}
        {!loading && sortedResults.length > 0 && (
          <div className="flex justify-between items-center mb-6 p-4 bg-white rounded-lg shadow-sm">
            <div className="flex items-center space-x-4">
              <span className="text-amber-800 font-medium">Trier par :</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-amber-300 rounded-lg px-3 py-2 text-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="pertinence">Pertinence</option>
                <option value="prix-croissant">Prix croissant</option>
                <option value="prix-decroissant">Prix décroissant</option>
                <option value="note">Meilleures notes</option>
              </select>
            </div>
          </div>
        )}

        {/* Résultats */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
          </div>
        ) : sortedResults.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedResults.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group"
              >
                <div className="relative overflow-hidden">
                  <div className="w-full h-48 bg-amber-100 flex items-center justify-center">
                    <span className="text-amber-400 text-lg">🛍️</span>
                  </div>
                  <div className="absolute top-2 right-2">
                    <span className="bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      {product.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-amber-900 mb-2 group-hover:text-amber-700 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-amber-600 text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-3">
                    {renderStars(product.rating)}
                    <span className="text-lg font-bold text-amber-800">
                      {product.price.toFixed(2)}€
                    </span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-amber-600 text-white py-2 px-4 rounded-lg hover:bg-amber-700 transition-colors text-sm font-medium">
                      Ajouter au panier
                    </button>
                    <button className="p-2 border border-amber-300 text-amber-600 rounded-lg hover:bg-amber-50 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-amber-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-amber-800 mb-2">
              Aucun résultat trouvé
            </h3>
            <p className="text-amber-600 mb-6">
              Aucun produit ne correspond à votre recherche "<strong>{query}</strong>"
            </p>
            <div className="space-y-4">
              <p className="text-amber-700">Suggestions :</p>
              <ul className="text-amber-600 space-y-2">
                <li>• Vérifiez l'orthographe des mots</li>
                <li>• Utilisez des termes plus généraux</li>
                <li>• Essayez d'autres mots-clés</li>
                <li>• Consultez nos catégories principales</li>
              </ul>
              <div className="pt-4">
                <Link
                  to="/"
                  className="inline-flex items-center bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors font-medium"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Retour à l'accueil
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recherche;