// src/App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Products from './components/Products';
import SoinsVisage from './pages/SoinsVisage';
import Corps from './pages/Corps';
import Maquillage from './pages/Maquillage';
import Marques from './pages/Marques';
import Panier from './pages/Panier';
import Favoris from './pages/Favoris';
import Recherche from './pages/Recherche';
import Nouveautes from './pages/Nouveautes';
import Livraison from './pages/Livraison';
import Retours from './pages/Retours';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import MentionsLegales from './pages/MentionsLegales';
import Confidentialite from './pages/Confidentialite';
import CGV from './pages/CGV';
import Compte from './pages/Compte';
import ScrollToTop from './components/ScrollToTop';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';

function App() {
  return (
    <CartProvider>
      <FavoritesProvider>
        <div className="min-h-screen bg-white">
          <ScrollToTop />
          <NavBar />
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <Products />
              </>
            } />
            <Route path="/soins-visage" element={<SoinsVisage />} />
            <Route path="/corps" element={<Corps />} />
            <Route path="/maquillage" element={<Maquillage />} />
            <Route path="/marques" element={<Marques />} />
            <Route path="/panier" element={<Panier />} />
            <Route path="/favoris" element={<Favoris />} />
            <Route path="/recherche" element={<Recherche />} />
            <Route path="/nouveautes" element={<Nouveautes />} />
            <Route path="/livraison" element={<Livraison />} />
            <Route path="/retours" element={<Retours />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/mentions-legales" element={<MentionsLegales />} />
            <Route path="/confidentialite" element={<Confidentialite />} />
            <Route path="/cgv" element={<CGV />} />
            <Route path="/compte" element={<Compte />} />
          </Routes>
          <Footer />
        </div>
      </FavoritesProvider>
    </CartProvider>
  );
}

export default App;