import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';

const NavBar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { getTotalItems } = useCart();
  const { favorites } = useFavorites();
  const totalItems = getTotalItems();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Accueil', path: '/' },
    { name: 'Soins Visage', path: '/soins-visage' },
    { name: 'Corps', path: '/corps' },
    { name: 'Maquillage', path: '/maquillage' },
    { name: 'Marques', path: '/marques' }
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/recherche', { state: { query: searchQuery } });
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      isScrolled ? 'bg-beige/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl font-bold text-amber-900 tracking-wider hover:scale-105 transition-transform duration-300"
          >
            Maram Beauty
          </Link>
          
          {/* Navigation Items */}
          <div className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-amber-800/80 hover:text-amber-900 transition-all duration-300 font-medium text-sm tracking-wide relative group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-700 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Icons avec animations */}
          <div className="flex items-center space-x-6">
            {/* Search Icon avec barre de recherche qui apparaît au hover */}
            <div 
              className="relative flex items-center"
              onMouseEnter={() => setIsSearchOpen(true)}
              onMouseLeave={() => {
                if (!searchQuery) {
                  setIsSearchOpen(false);
                }
              }}
            >
              {/* Barre de recherche qui apparaît à côté */}
              <div className={`transition-all duration-300 ${
                isSearchOpen ? 'opacity-100 w-48 mr-2' : 'opacity-0 w-0 mr-0'
              }`}>
                <form onSubmit={handleSearchSubmit} className="flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Rechercher..."
                    className="w-full bg-transparent border-b border-amber-300 focus:border-amber-600 focus:outline-none text-amber-900 placeholder-amber-400 text-sm py-1 transition-colors duration-300"
                    autoFocus={isSearchOpen}
                  />
                </form>
              </div>

              {/* Icône de recherche */}
              <button className="text-amber-800/70 hover:text-amber-900 transition-all duration-300 transform hover:scale-110 flex-shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>

            {/* Favorite Icon avec compteur */}
            <Link 
              to="/favoris" 
              className="text-amber-800/70 hover:text-amber-900 transition-all duration-300 transform hover:scale-110 relative group"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full text-white text-xs flex items-center justify-center font-bold animate-bounce">
                  {favorites.length}
                </span>
              )}
            </Link>

            {/* User Account Icon */}
            <Link 
              to="/compte" 
              className="text-amber-800/70 hover:text-amber-900 transition-all duration-300 transform hover:scale-110 relative group"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
            </Link>

            {/* Cart Icon */}
            <Link 
              to="/panier" 
              className="text-amber-800/70 hover:text-amber-900 transition-all duration-300 transform hover:scale-110 relative group"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-600 rounded-full text-white text-xs flex items-center justify-center font-bold animate-bounce">
                {totalItems}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;