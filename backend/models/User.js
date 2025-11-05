import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Le prénom est requis'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Le nom est requis'],
    trim: true,
  },
  // Dans models/User.js, ajoutez cette validation :
email: {
  type: String,
  required: [true, 'Email est requis'],
  unique: true,
  lowercase: true,
  trim: true,
  match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Email invalide']
},
  password: {
    type: String,
    required: [true, 'Mot de passe requis'],
    minlength: 6,
  },
  address: {
    street: String,
    city: String,
    postalCode: String,
    country: { type: String, default: 'France' },
  },
  phone: String,
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.correctPassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('User', userSchema);