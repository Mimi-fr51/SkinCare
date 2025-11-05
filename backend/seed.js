import mongoose from 'mongoose';
import Product from './models/Product.js';
import dotenv from 'dotenv';

dotenv.config();

const sampleProducts = [
  {
    name: "Crème Hydratante Bio MARAM",
    description: "Une crème naturelle à l'aloe vera pour une peau hydratée et rayonnante. Formulée avec des ingrédients 100% naturels.",
    price: 29.99,
    originalPrice: 34.99,
    category: "visage",
    brand: "MARAM BEAUTY",
    images: [
      {
        url: "https://images.unsplash.com/photo-1556228578-8cf80b7bad8e?w=400",
        alt: "Crème hydratante bio"
      }
    ],
    stock: 50,
    featured: true,
    ingredients: ["Aloe Vera", "Huile d'Argan", "Beurre de Karité", "Vitamine E"],
    skinTypes: ["Sèche", "Normale", "Mixte"],
    rating: 4.5,
    reviewCount: 24
  },
  {
    name: "Gel Douche Nourrissant Lavande",
    description: "Nettoyant corporel aux huiles essentielles de lavande pour une peau douce et parfumée.",
    price: 15.50,
    category: "corps",
    brand: "MARAM BEAUTY",
    images: [
      {
        url: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400",
        alt: "Gel douche nourrissant"
      }
    ],
    stock: 30,
    featured: false,
    ingredients: ["Huile d'Amande", "Miel", "Lavande", "Extrait de Camomille"],
    skinTypes: ["Tous types"],
    rating: 4.2,
    reviewCount: 18
  },
  {
    name: "Sérum Anti-Âge Intensif",
    description: "Sérum concentré en actifs anti-âge pour réduire les rides et ridules.",
    price: 45.00,
    originalPrice: 52.00,
    category: "visage",
    brand: "MARAM BEAUTY",
    images: [
      {
        url: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400",
        alt: "Sérum anti-âge"
      }
    ],
    stock: 20,
    featured: true,
    ingredients: ["Vitamine C", "Acide Hyaluronique", "Collagène", "Rétinol"],
    skinTypes: ["Mature", "Sèche"],
    rating: 4.8,
    reviewCount: 32
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/maram-beauty');
    console.log('✅ Connecté à MongoDB');

    // Vider la collection existante
    await Product.deleteMany({});
    console.log('✅ Anciens produits supprimés');

    // Ajouter les nouveaux produits
    await Product.insertMany(sampleProducts);
    console.log('✅ Produits de test ajoutés');

    console.log('🎉 Base de données initialisée avec succès !');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur:', error);
    process.exit(1);
  }
};

seedDatabase();