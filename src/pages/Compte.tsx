// src/pages/Compte.tsx
import React, { useState } from 'react';

const Compte: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = isLogin 
        ? 'http://localhost:5000/api/auth/login'
        : 'http://localhost:5000/api/auth/register';
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem('token', result.token);
        alert(isLogin ? 'Connexion réussie !' : 'Inscription réussie !');
        window.location.href = '/';
      } else {
        alert(result.message || 'Erreur');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur de connexion');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="pt-20 min-h-screen bg-amber-50">
      <div className="container mx-auto px-6 py-12 max-w-md">
        <h1 className="text-4xl font-bold text-amber-900 mb-8 text-center">
          {isLogin ? 'Connexion' : 'Inscription'}
        </h1>
        
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
          {!isLogin && (
            <>
              <div className="mb-4">
                <label className="block text-amber-900 mb-2">Prénom</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full p-2 border border-amber-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-amber-900 mb-2">Nom</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full p-2 border border-amber-300 rounded"
                  required
                />
              </div>
            </>
          )}
          
          <div className="mb-4">
            <label className="block text-amber-900 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-amber-300 rounded"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-amber-900 mb-2">Mot de passe</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-amber-300 rounded"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-amber-800 text-white py-3 rounded-lg hover:bg-amber-900 transition-colors"
          >
            {isLogin ? 'Se connecter' : 'S\'inscrire'}
          </button>
        </form>
        
        <div className="text-center mt-4">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-amber-800 hover:text-amber-900"
          >
            {isLogin ? 'Pas de compte ? Inscrivez-vous' : 'Déjà un compte ? Connectez-vous'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Compte;