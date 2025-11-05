import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// ⚠️ MONGODB DÉSACTIVÉ - ON UTILISE DES DONNÉES FICTIVES
console.log('🔧 Mode développement - Données fictives');

// Données fictives pour les produits
const products = [
  {
    _id: "1",
    name: "Crème Hydratante Bio MARAM",
    description: "Une crème naturelle à l'aloe vera pour une peau hydratée et rayonnante.",
    price: 29.99,
    category: "visage",
    brand: "MARAM BEAUTY",
    image: "https://images.unsplash.com/photo-1556228578-8cf80b7bad8e?w=400",
    stock: 50,
    rating: 4.5,
    reviewCount: 24
  },
  {
    _id: "2", 
    name: "Gel Douche Nourrissant Lavande",
    description: "Nettoyant corporel aux huiles essentielles de lavande.",
    price: 15.50,
    category: "corps", 
    brand: "MARAM BEAUTY",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400",
    stock: 30,
    rating: 4.2,
    reviewCount: 18
  },
  {
    _id: "3",
    name: "Sérum Anti-Âge Intensif", 
    description: "Sérum concentré en actifs anti-âge pour réduire les rides.",
    price: 45.00,
    category: "visage",
    brand: "MARAM BEAUTY",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400",
    stock: 20,
    rating: 4.8,
    reviewCount: 32
  }
];

// Routes simples
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Backend BEAUTY-51 en marche! 🚀',
    timestamp: new Date().toISOString()
  });
});

// Route produits
app.get('/api/products', (req, res) => {
  res.json({
    success: true,
    data: products
  });
});

// Route produit par ID
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p._id === req.params.id);
  if (!product) {
    return res.status(404).json({ message: 'Produit non trouvé' });
  }
  res.json({
    success: true,
    data: product
  });
});

// Route commande simulée
app.post('/api/orders', (req, res) => {
  console.log('📦 Commande reçue:', req.body);
  res.json({
    success: true,
    message: 'Commande passée avec succès!',
    orderId: 'CMD-' + Date.now()
  });
});

// Route connexion simulée
app.post('/api/auth/login', (req, res) => {
  res.json({
    _id: "1",
    firstName: "Test",
    lastName: "Utilisateur", 
    email: req.body.email,
    token: "token_simule_" + Date.now()
  });
});

// Route inscription simulée
app.post('/api/auth/register', (req, res) => {
  res.json({
    _id: "2",
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    token: "token_simule_" + Date.now()
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🎯 Backend démarré sur http://localhost:${PORT}`);
  console.log(`✅ Health: http://localhost:${PORT}/api/health`);
  console.log(`🛍️  Produits: http://localhost:${PORT}/api/products`);
  console.log(`🔧 Mode: Développement avec données fictives`);
});