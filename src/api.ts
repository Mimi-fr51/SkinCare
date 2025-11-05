const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper pour les requêtes authentifiées
const authHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : ''
  };
};

export const api = {
  // Produits
  async getProducts() {
    const response = await fetch(`${API_BASE_URL}/products`);
    return response.json();
  },

  async getProduct(id: string) {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    return response.json();
  },

  // Commandes
  async createOrder(orderData: any) {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(orderData)
    });
    return response.json();
  },

  async getOrders() {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      headers: authHeaders()
    });
    return response.json();
  },

  // Utilisateurs
  async getProfile() {
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      headers: authHeaders()
    });
    return response.json();
  },

  async updateProfile(profileData: any) {
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify(profileData)
    });
    return response.json();
  },

  // Favoris
  async getFavorites() {
    const response = await fetch(`${API_BASE_URL}/users/favorites`, {
      headers: authHeaders()
    });
    return response.json();
  },

  async addToFavorites(productId: string) {
    const response = await fetch(`${API_BASE_URL}/users/favorites/${productId}`, {
      method: 'POST',
      headers: authHeaders()
    });
    return response.json();
  },

  async removeFromFavorites(productId: string) {
    const response = await fetch(`${API_BASE_URL}/users/favorites/${productId}`, {
      method: 'DELETE',
      headers: authHeaders()
    });
    return response.json();
  }
};