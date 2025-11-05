// src/pages/FAQ.tsx
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  const faqItems = [
    {
      question: "Quels sont les délais de livraison ?",
      answer: "La livraison standard prend 3-5 jours ouvrables. La livraison express est disponible en 24-48h. Les commandes passées avant 14h sont expédiées le jour même."
    },
    {
      question: "Puis-je modifier ma commande après l'avoir passée ?",
      answer: "Vous pouvez modifier votre commande dans l'heure qui suit sa validation. Après ce délai, veuillez nous contacter rapidement par email ou téléphone."
    },
    {
      question: "Quelle est votre politique de retour ?",
      answer: "Nous acceptons les retours sous 30 jours. Les produits doivent être dans leur état d'origine avec l'emballage intact. Les produits de beauté ouverts ne peuvent être repris pour des raisons d'hygiène."
    },
    {
      question: "Mes produits sont-ils garantis ?",
      answer: "Tous nos produits bénéficient de la garantie légale de conformité de 2 ans. En cas de défaut de fabrication, nous remplaçons le produit ou procédons au remboursement."
    },
    {
      question: "Proposez-vous des échantillons ?",
      answer: "Oui ! Nous ajoutons gratuitement 2 échantillons au choix à chaque commande supérieure à 35€. Vous pouvez les sélectionner lors de votre commande."
    },
    {
      question: "Quels modes de paiement acceptez-vous ?",
      answer: "Nous acceptons les cartes bancaires (Visa, Mastercard, American Express), PayPal, Apple Pay et Google Pay. Tous les paiements sont sécurisés."
    },
    {
      question: "Comment créer un compte client ?",
      answer: "Cliquez sur 'Mon compte' en haut à droite de notre site, puis sur 'Créer un compte'. Remplissez le formulaire avec vos informations et validez votre email."
    },
    {
      question: "Proposez-vous la livraison à l'international ?",
      answer: "Actuellement, nous livrons uniquement en France métropolitaine. Pour les DOM-TOM et autres pays, veuillez nous contacter pour étudier les possibilités."
    }
  ];

  return (
    <div className="min-h-screen bg-amber-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-amber-900 mb-4">Foire aux questions</h1>
          <p className="text-amber-700 text-lg">Trouvez rapidement des réponses à vos questions</p>
        </div>

        <div className="bg-white rounded-lg shadow-md border border-amber-200">
          {faqItems.map((item, index) => (
            <div key={index} className="border-b border-amber-200 last:border-b-0">
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-amber-50 transition-colors"
              >
                <span className="font-semibold text-amber-900 text-lg">{item.question}</span>
                {openItems.includes(index) ? (
                  <ChevronUp className="w-5 h-5 text-amber-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-amber-600" />
                )}
              </button>
              
              {openItems.includes(index) && (
                <div className="px-6 pb-4">
                  <p className="text-amber-700 leading-relaxed">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-amber-700 mb-4">Vous n'avez pas trouvé la réponse à votre question ?</p>
          <a
            href="/contact"
            className="inline-block bg-amber-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-all duration-300"
          >
            Contactez-nous
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQ;