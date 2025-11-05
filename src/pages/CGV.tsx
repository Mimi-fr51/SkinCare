// src/pages/CGV.tsx
import React from 'react';

const CGV = () => {
  return (
    <div className="min-h-screen bg-amber-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-amber-900 mb-4">Conditions Générales de Vente</h1>
          <p className="text-amber-700 text-lg">Dernière mise à jour : 1er Janvier 2024</p>
        </div>

        <div className="bg-white rounded-lg p-8 shadow-md border border-amber-200">
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-amber-900 mb-4">Article 1 - Objet</h2>
              <p className="text-amber-700">
                Les présentes conditions générales de vente régissent les ventes par la société Maram Beauty SARL, 
                de produits de beauté et cosmétiques, via son site internet marambeauty.com.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-amber-900 mb-4">Article 2 - Prix</h2>
              <p className="text-amber-700">
                Les prix de nos produits sont indiqués en euros toutes taxes comprises (TVA et autres taxes applicables). 
                Les frais de livraison sont en sus et précisés au moment de la commande. Maram Beauty se réserve le droit 
                de modifier ses prix à tout moment.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-amber-900 mb-4">Article 3 - Commande</h2>
              <p className="text-amber-700 mb-4">
                Vous pouvez passer commande :
              </p>
              <ul className="text-amber-700 list-disc list-inside space-y-2">
                <li>Sur Internet : marambeauty.com</li>
                <li>Par téléphone : +33 1 23 45 67 89</li>
              </ul>
              <p className="text-amber-700 mt-4">
                Les informations contractuelles sont présentées en langue française et font l'objet d'une confirmation 
                au plus tard au moment de la validation de votre commande.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-amber-900 mb-4">Article 4 - Validation de la commande</h2>
              <p className="text-amber-700">
                Toute commande figurant sur le site Internet marambeauty.com suppose l'adhésion aux présentes Conditions 
                Générales de Vente. Toute confirmation de commande entraîne votre adhésion pleine et entière aux présentes 
                CGV, sans exception ni réserve.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-amber-900 mb-4">Article 5 - Paiement</h2>
              <p className="text-amber-700 mb-4">
                Le paiement est exigible immédiatement à la commande. Vous pouvez régler votre commande par :
              </p>
              <ul className="text-amber-700 list-disc list-inside space-y-2">
                <li>Carte bancaire (Visa, Mastercard, American Express)</li>
                <li>PayPal</li>
                <li>Apple Pay</li>
                <li>Google Pay</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-amber-900 mb-4">Article 6 - Livraison</h2>
              <p className="text-amber-700">
                La livraison est effectuée à l'adresse indiquée par le client sur le bon de commande. Les délais de 
                livraison indiqués sont des délais moyens et ne sont donnés qu'à titre indicatif. En cas de retard 
                de livraison, le client sera informé par email.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-amber-900 mb-4">Article 7 - Droit de rétractation</h2>
              <p className="text-amber-700">
                Conformément aux dispositions légales, vous disposez d'un délai de 14 jours à compter de la réception 
                de vos produits pour exercer votre droit de rétractation sans avoir à justifier de motifs ni à payer 
                de pénalités.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-amber-900 mb-4">Article 8 - Garanties</h2>
              <p className="text-amber-700">
                Tous nos produits bénéficient de la garantie légale de conformité et de la garantie des vices cachés, 
                prévues par les articles L.217-4 et suivants du Code de la consommation.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-amber-900 mb-4">Article 9 - Responsabilité</h2>
              <p className="text-amber-700">
                La responsabilité de Maram Beauty ne saurait être engagée en cas de non-exécution ou de mauvaise 
                exécution de la commande imputable au client, notamment lors de la saisie des informations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-amber-900 mb-4">Article 10 - Droit applicable</h2>
              <p className="text-amber-700">
                Les présentes conditions générales de vente sont soumises au droit français. En cas de litige, 
                les tribunaux français seront seuls compétents.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CGV;