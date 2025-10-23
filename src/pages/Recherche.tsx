import React from 'react';
import { useLocation } from 'react-router-dom';

const Recherche: React.FC = () => {
  const location = useLocation();
  const query = location.state?.query || '';

  return (
    <div className="pt-20 min-h-screen bg-amber-50">
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-amber-900 mb-8">
          Résultats pour : "{query}"
        </h1>
        <p className="text-amber-700">Aucun résultat trouvé pour votre recherche.</p>
      </div>
    </div>
  );
};

export default Recherche;