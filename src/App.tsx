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

function App() {
  return (
    <div className="min-h-screen bg-white">
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
      </Routes>
      <Footer />
    </div>
  );
}

export default App;