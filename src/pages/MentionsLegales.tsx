// src/pages/MentionsLegales.tsx
import React from 'react';

const MentionsLegales = () => {
  return (
    <div className="min-h-screen bg-amber-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-amber-900 mb-4">Mentions Légales</h1>
        </div>

        <div className="bg-white rounded-lg p-8 shadow-md border border-amber-200">
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-amber-900 mb-4">1. Éditeur du site</h2>
              <div className="text-amber-700 space-y-2">
                <p><strong>Maram Beauty SARL</strong></p>
                <p>Capital social : 50 000 €</p>
                <p>RCS Paris 123 456 789</p>
                <p>N° TVA : FR 12 345 678 90</p>
                <p>123 Avenue des Champs-Élysées - 75008 Paris</p>
                <p>Téléphone : +33 1 23 45 67 89</p>
                <p>Email : contact@marambeauty.com</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-amber-900 mb-4">2. Directeur de la publication</h2>
              <p className="text-amber-700">Mme Maram Agrebi - Gérante</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-amber-900 mb-4">3. Hébergement</h2>
              <div className="text-amber-700 space-y-2">
                <p><strong>Vercel Inc.</strong></p>
                <p>340 S Lemon Ave #4133</p>
                <p>Walnut, CA 91789</p>
                <p>United States</p>
                <p>Site web : vercel.com</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-amber-900 mb-4">4. Propriété intellectuelle</h2>
              <p className="text-amber-700">
                L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur 
                et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les 
                documents téléchargeables et les représentations iconographiques et photographiques.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-amber-900 mb-4">5. Protection des données personnelles</h2>
              <p className="text-amber-700">
                Conformément à la loi "Informatique et Libertés" du 6 janvier 1978 modifiée et au Règlement Général 
                sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification, de suppression 
                et d'opposition aux données vous concernant.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-amber-900 mb-4">6. Cookies</h2>
              <p className="text-amber-700">
                Le site peut utiliser des cookies pour améliorer l'expérience utilisateur. En naviguant sur ce site, 
                vous acceptez l'utilisation de cookies conformément à notre politique de confidentialité.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentionsLegales;