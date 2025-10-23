import React from 'react'
import { motion } from 'framer-motion'

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full"></div>
            <span className="text-xl font-bold text-gray-900">BeautyGlow</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {['Accueil', 'Produits', 'Collections', 'Blog', 'Contact'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-gray-700 hover:text-pink-500 transition-colors duration-300 font-medium"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transition-shadow duration-300">
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header