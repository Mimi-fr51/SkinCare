// src/pages/Retours.tsx
import React from 'react';
import { RefreshCw, Calendar, Package, CheckCircle } from 'lucide-react';

const Retours = () => {
  return (
    <div className="min-h-screen bg-amber-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-amber-900 mb-4">Retours & Échanges</h1>
          <p className="text-amber-700 text-lg">Notre politique de retour simple et sans frais</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg p-6 text-center shadow-md border border-amber-200">
            <Calendar className="w-12 h-12 text-amber-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-amber-900 mb-2">30 Jours</h3>
            <p className="text-amber-700">Délai pour effectuer votre retour</p>
          </div>

          <div className="bg-white rounded-lg p-6 text-center shadow-md border border-amber-200">
            <RefreshCw className="w-12 h-12 text-amber-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-amber-900 mb-2">Gratuit</h3>
            <p className="text-amber-700">Retours offerts sans frais</p>
          </div>

          <div className="bg-white rounded-lg p-6 text-center shadow-md border border-amber-200">
            <CheckCircle className="w-12 h-12 text-amber-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-amber-900 mb-2">Simple</h3>
            <p className="text-amber-700">Processus de retour facile</p>
          </div>
        </div>

        <div className="bg-white rounded-lg p-8 shadow-md border border-amber-200 mb-8">
          <h2 className="text-2xl font-bold text-amber-900 mb-6">Comment retourner un article ?</h2>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-amber-100 text-amber-800 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 mt-1">
                1
              </div>
              <div>
                <h4 className="font-semibold text-amber-900 mb-2">Connectez-vous à votre compte</h4>
                <p className="text-amber-700">Accédez à votre espace client et sélectionnez la commande concernée.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-amber-100 text-amber-800 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 mt-1">
                2
              </div>
              <div>
                <h4 className="font-semibold text-amber-900 mb-2">Imprimez l'étiquette</h4>
                <p className="text-amber-700">Téléchargez et imprimez l'étiquette de retour prépayée.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-amber-100 text-amber-800 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 mt-1">
                3
              </div>
              <div>
                <h4 className="font-semibold text-amber-900 mb-2">Déposez le colis</h4>
                <p className="text-amber-700">Déposez votre colis dans un point relais ou bureau de poste.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-amber-100 rounded-lg p-6 border border-amber-300">
          <h3 className="text-lg font-semibold text-amber-900 mb-3">Conditions</h3>
          <ul className="text-amber-700 space-y-2">
            <li>• Les produits doivent être dans leur état d'origine</li>
            <li>• L'emballage d'origine doit être intact</li>
            <li>• Les produits de beauté ouverts ne peuvent être repris</li>
            <li>• Le remboursement est effectué sous 14 jours</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Retours;