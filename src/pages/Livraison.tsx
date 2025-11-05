// src/pages/Livraison.tsx
import React from 'react';
import { Truck, Clock, Shield, Package } from 'lucide-react';

const Livraison = () => {
  return (
    <div className="min-h-screen bg-amber-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-amber-900 mb-4">Livraison</h1>
          <p className="text-amber-700 text-lg">Découvrez nos options de livraison rapide et sécurisée</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg p-6 shadow-md border border-amber-200">
            <Truck className="w-12 h-12 text-amber-600 mb-4" />
            <h3 className="text-xl font-bold text-amber-900 mb-3">Livraison Standard</h3>
            <p className="text-amber-700 mb-4">Délai : 3-5 jours ouvrables</p>
            <p className="text-amber-600">Offerte à partir de 50€ d'achat</p>
            <p className="text-2xl font-bold text-amber-800 mt-2">4,90 €</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md border border-amber-200">
            <Clock className="w-12 h-12 text-amber-600 mb-4" />
            <h3 className="text-xl font-bold text-amber-900 mb-3">Livraison Express</h3>
            <p className="text-amber-700 mb-4">Délai : 24-48h</p>
            <p className="text-amber-600">Disponible du lundi au vendredi</p>
            <p className="text-2xl font-bold text-amber-800 mt-2">9,90 €</p>
          </div>
        </div>

        <div className="bg-white rounded-lg p-8 shadow-md border border-amber-200 mb-8">
          <h2 className="text-2xl font-bold text-amber-900 mb-6">Informations importantes</h2>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <Package className="w-6 h-6 text-amber-600 mt-1" />
              <div>
                <h4 className="font-semibold text-amber-900 mb-2">Suivi de commande</h4>
                <p className="text-amber-700">Vous recevrez un email de confirmation avec un numéro de suivi dès l'expédition de votre colis.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-amber-600 mt-1" />
              <div>
                <h4 className="font-semibold text-amber-900 mb-2">Emballage sécurisé</h4>
                <p className="text-amber-700">Tous nos produits sont soigneusement emballés pour garantir leur intégrité pendant le transport.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-amber-100 rounded-lg p-6 border border-amber-300">
          <h3 className="text-lg font-semibold text-amber-900 mb-3">Zone de livraison</h3>
          <p className="text-amber-700">Nous livrons partout en France métropolitaine. Pour les DOM-TOM et l'international, veuillez nous contacter.</p>
        </div>
      </div>
    </div>
  );
};

export default Livraison;