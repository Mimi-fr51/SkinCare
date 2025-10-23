import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleDiscoverProducts = () => {
    navigate('/marques');
  };

  const handleConsultation = () => {
    setIsCalendarOpen(true);
  };

  const handleReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDate && selectedTime) {
      // Simulation de réservation
      setTimeout(() => {
        setIsCalendarOpen(false);
        setSelectedDate('');
        setSelectedTime('');
        // Redirection vers l'accueil après réservation
        navigate('/');
      }, 1500);
    }
  };

  // Générer les créneaux horaires
  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

  return (
    <>
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("/pexels-natalia-hawthorne-2149934-3785147.jpg")'
          }}
        >
          <div className="absolute inset-0 bg-black/10"></div>
        </div>

        {/* Overlay très subtil pour le texte */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"></div>

        {/* Main Content */}
        <div className="container mx-auto px-6 z-10">
          <div className="max-w-2xl">
            <div className={`transition-all duration-1000 transform ${
              isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
            }`}>
              {/* Titre principal */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-amber-900 leading-tight mb-6">
                <span className="block font-light">Votre peau</span>
                <span className="block font-light italic">mérite le</span>
                <span className="block font-semibold mt-2">meilleur</span>
              </h1>

              {/* Sous-titre avec cadre glassmorphism */}
              <div className="mb-8 max-w-md">
                <div className="bg-white/20 backdrop-blur-lg p-6 rounded-xl border border-white/30 shadow-2xl">
                  <p className="text-lg text-amber-900 font-medium leading-relaxed">
                    Découvrez notre collection de soins skincare naturels et efficaces pour une peau rayonnante et en bonne santé.
                  </p>
                </div>
              </div>

              {/* Boutons CTA */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleDiscoverProducts}
                  className="bg-amber-800 text-white px-8 py-4 text-sm font-light tracking-wider hover:bg-amber-900 transition-all duration-500 transform hover:scale-105 group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Découvrir les produits
                    <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </button>
                
               <button 
  onClick={handleConsultation}
  className="bg-amber-800 text-white px-8 py-4 text-sm font-light tracking-wider hover:bg-amber-900 transition-all duration-500 transform hover:scale-105 group relative overflow-hidden"
>
  <span className="relative z-10 flex items-center justify-center">
    Consultation gratuite
  </span>
</button>
              </div>
            </div>
          </div>
        </div>

        {/* Éléments décoratifs flottants */}
        <div className="absolute bottom-10 right-10 w-6 h-6 bg-amber-200/50 rounded-full animate-float-soft"></div>
        <div className="absolute top-20 right-32 w-8 h-8 bg-amber-100/30 rounded-full animate-float-soft delay-700"></div>
        <div className="absolute top-1/2 left-20 w-4 h-4 bg-amber-300/40 rounded-full animate-float-soft delay-300"></div>
      </section>

      {/* Modal Calendrier */}
      {isCalendarOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay flou */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-lg transition-all duration-500"
            onClick={() => setIsCalendarOpen(false)}
          />
          
          {/* Contenu du calendrier */}
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full transform animate-scale-in">
            <div className="p-6">
              {/* En-tête */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-serif text-amber-900 mb-2">
                  Réservez votre consultation
                </h2>
                <p className="text-amber-700">
                  Choisissez la date et l'heure de votre consultation gratuite
                </p>
              </div>

              {/* Formulaire de réservation */}
              <form onSubmit={handleReservation} className="space-y-6">
                {/* Sélection de date */}
                <div>
                  <label className="block text-amber-900 font-medium mb-2">
                    Date de consultation
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full p-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>

                {/* Sélection d'horaire */}
                <div>
                  <label className="block text-amber-900 font-medium mb-2">
                    Horaire
                  </label>
                  <div className="grid grid-cols-3 gap-2 max-h-40 overflow-y-auto">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={`p-3 rounded-lg border transition-all duration-300 ${
                          selectedTime === time
                            ? 'bg-amber-800 text-white border-amber-800 transform scale-105'
                            : 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Informations de contact */}
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Votre nom complet"
                    className="w-full p-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Votre email"
                    className="w-full p-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Votre téléphone"
                    className="w-full p-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>

                {/* Boutons d'action */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsCalendarOpen(false)}
                    className="flex-1 border border-amber-800 text-amber-800 py-3 rounded-lg hover:bg-amber-50 transition-all duration-300"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={!selectedDate || !selectedTime}
                    className="flex-1 bg-amber-800 text-white py-3 rounded-lg hover:bg-amber-900 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    Confirmer la réservation
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;