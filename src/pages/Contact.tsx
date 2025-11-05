// src/pages/Contact.tsx
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici vous pouvez ajouter la logique d'envoi du formulaire
    console.log('Formulaire envoyé:', formData);
    alert('Votre message a été envoyé ! Nous vous répondrons dans les plus brefs délais.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-amber-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-amber-900 mb-4">Contactez-nous</h1>
          <p className="text-amber-700 text-lg">Nous sommes là pour répondre à toutes vos questions</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Informations de contact */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-md border border-amber-200">
              <h2 className="text-2xl font-bold text-amber-900 mb-6">Nos coordonnées</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-amber-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-amber-900">Email</h3>
                    <p className="text-amber-700">contact@marambeauty.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-amber-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-amber-900">Téléphone</h3>
                    <p className="text-amber-700">+33 1 23 45 67 89</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-amber-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-amber-900">Adresse</h3>
                    <p className="text-amber-700">123 Avenue des Champs-Élysées<br />75008 Paris, France</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-amber-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-amber-900">Horaires</h3>
                    <p className="text-amber-700">Lun - Ven : 9h - 18h<br />Sam : 10h - 17h</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Formulaire de contact */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg p-8 shadow-md border border-amber-200">
              <h2 className="text-2xl font-bold text-amber-900 mb-6">Envoyez-nous un message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-amber-900 mb-2">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-amber-50 outline-none transition-all"
                      placeholder="Votre nom"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-amber-900 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-amber-50 outline-none transition-all"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-amber-900 mb-2">
                    Sujet *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-amber-50 outline-none transition-all"
                  >
                    <option value="">Sélectionnez un sujet</option>
                    <option value="commande">Question sur ma commande</option>
                    <option value="produit">Information produit</option>
                    <option value="livraison">Problème de livraison</option>
                    <option value="retour">Demande de retour</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-amber-900 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-amber-50 outline-none transition-all resize-none"
                    placeholder="Décrivez-nous votre demande..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-amber-700 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Envoyer le message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;