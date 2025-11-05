import express from 'express';
import { 
  getProfile, 
  updateProfile, 
  addToFavorites, 
  removeFromFavorites, 
  getFavorites 
} from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/profile')
  .get(protect, getProfile)
  .put(protect, updateProfile);

router.route('/favorites')
  .get(protect, getFavorites);

router.route('/favorites/:productId')
  .post(protect, addToFavorites)
  .delete(protect, removeFromFavorites);

export default router;