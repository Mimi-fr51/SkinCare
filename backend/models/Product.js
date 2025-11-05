import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Le nom du produit est requis'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'La description est requise'],
  },
  price: {
    type: Number,
    required: [true, 'Le prix est requis'],
    min: [0, 'Le prix ne peut pas être négatif'],
  },
  originalPrice: {
    type: Number,
    min: 0,
  },
  category: {
    type: String,
    required: true,
    enum: ['visage', 'corps', 'maquillage', 'cheveux'],
  },
  subcategory: String,
  brand: {
    type: String,
    required: true,
  },
  images: [{
    url: String,
    alt: String,
  }],
  stock: {
    type: Number,
    default: 0,
    min: 0,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  ingredients: [String],
  skinTypes: [String],
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  reviewCount: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

// Index pour la recherche
productSchema.index({ name: 'text', description: 'text', brand: 'text' });

export default mongoose.model('Product', productSchema);