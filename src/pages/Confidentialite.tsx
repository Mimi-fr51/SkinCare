// src/pages/Confidentialite.tsx
import React from 'react';

const Confidentialite = () => {
  return (
    <div className="min-h-screen bg-amber-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-amber-900 mb-4">Politique de Confidentialité</h1>
          <p className="text-amber-700 text-lg">Dernière mise à jour : 1er Janvier 2024</p>
        </div>

        <div className="bg-white rounded-lg p-8 shadow-md border border-amber-200">
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-amber-900 mb-4">1. Collecte des informations</h2>
              <p className="text-amber-700 mb-4">
                Nous collectons les informations que vous nous fournissez lorsque vous :
              </p>
              <ul className="text-amber-700 list-disc list-inside space-y-2">
                <li>Créez un compte sur notre site</li>
                <li>Passez une commande</li>
                <li>Vous abonnez à notre newsletter</li>
                <li>Participez à un concours ou sondage</li>
                <li>Nous contactez via le formulaire de contact</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-amber-900 mb-4">2. Utilisation des informations</h2>
              <p className="text-amber-700 mb-4">
                Les informations que nous collectons peuvent être utilisées pour :
              </p>
              <ul className="text-amber-700 list-disc list-inside space-y-2">
                <li>Traiter vos commandes et transactions</li>
                <li>Personnaliser votre expérience utilisateur</li>
                <li>Améliorer notre site web</li>
                <li>Vous envoyer des emails promotionnels (si vous y avez consenti)</li>
                <li>Améliorer notre service client</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-amber-900 mb-4">3. Protection des informations</h2>
              <p className="text-amber-700">
                Nous mettons en œuvre une variété de mesures de sécurité pour préserver la sécurité de vos 
                informations personnelles. Vos informations personnelles sont contenues derrière des réseaux 
                sécurisés et ne sont accessibles qu'un nombre limité de personnes ayant des droits d'accès 
                spéciaux à ces systèmes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-amber-900 mb-4">4. Partage des informations</h2>
              <p className="text-amber-700">
                Nous ne vendons, n'échangeons et ne transférons pas vos informations personnelles identifiables 
                à des tiers. Ceci n'inclut pas les tierces parties de confiance qui nous aident à exploiter notre 
                site web ou à mener nos affaires, tant que ces parties conviennent de garder ces informations 
                confidentielles.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-amber-900 mb-4">5. Vos droits</h2>
              <p className="text-amber-700 mb-4">
                Conformément au RGPD, vous disposez des droits suivants :
              </p>
              <ul className="text-amber-700 list-disc list-inside space-y-2">
                <li>Droit d'accès à vos données personnelles</li>
                <li>Droit de rectification des données inexactes</li>
                <li>Droit à l'effacement de vos données</li>
                <li>Droit à la limitation du traitement</li>
                <li>Droit à la portabilité des données</li>
                <li>Droit d'opposition au traitement</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-amber-900 mb-4">6. Contact</h2>
              <p className="text-amber-700">
                Pour toute question concernant cette politique de confidentialité, vous pouvez nous contacter à :
                <br />
                <strong>Email :</strong> privacy@marambeauty.com
                <br />
                <strong>Adresse :</strong> 123 Avenue des Champs-Élysées, 75008 Paris, France
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confidentialite;