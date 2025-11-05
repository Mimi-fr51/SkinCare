import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-amber-900 text-amber-100">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="text-2xl font-serif mb-4">MARAM BEAUTY</div>
            <p className="text-amber-200/70 text-sm leading-relaxed font-light">
              Des soins naturels et efficaces pour une peau rayonnante et en bonne santé.
            </p>
          </div>
          
          {/* Liens rapides */}
          <div className="col-span-1">
            <h4 className="font-medium mb-4">Produits</h4>
            <ul className="space-y-2 text-sm text-amber-200/70 font-light">
              {[
                { name: 'Soins Visage', path: '/soins-visage' },
                { name: 'Soins Corps', path: '/corps' },
                { name: 'Maquillage', path: '/maquillage' },
                { name: 'Nouveautés', path: '/nouveautes' }
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.path} 
                    className="hover:text-white transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Informations */}
          <div className="col-span-1">
            <h4 className="font-medium mb-4">Informations</h4>
            <ul className="space-y-2 text-sm text-amber-200/70 font-light">
              {[
                { name: 'Livraison', path: '/livraison' },
                { name: 'Retours', path: '/retours' },
                { name: 'Contact', path: '/contact' },
                { name: 'FAQ', path: '/faq' }
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.path} 
                    className="hover:text-white transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h4 className="font-medium mb-4">Contact</h4>
            <div className="text-sm text-amber-200/70 font-light space-y-2">
              <p>contact@marambeauty.com</p>
              <p>+33 1 23 45 67 89</p>
              <p>Paris, France</p>
            </div>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="border-t border-amber-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-amber-200/60 text-sm mb-4 md:mb-0 font-light">
            © 2024 MARAM BEAUTY. Tous droits réservés.
          </div>
          
          <div className="flex space-x-6">
            {[
              { name: 'Mentions légales', path: '/mentions-legales' },
              { name: 'Confidentialité', path: '/confidentialite' },
              { name: 'CGV', path: '/cgv' }
            ].map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-amber-200/60 hover:text-white transition-colors duration-300 text-sm font-light"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;