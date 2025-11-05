import User from '../models/User.js';

// @desc    Récupérer le profil utilisateur
// @route   GET /api/users/profile
// @access  Privé
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Mettre à jour le profil utilisateur
// @route   PUT /api/users/profile
// @access  Privé
export const updateProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone
      },
      { new: true, runValidators: true }
    ).select('-password');

    res.json({
      success: true,
      data: user,
      message: 'Profil mis à jour avec succès'
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Ajouter un produit aux favoris
// @route   POST /api/users/favorites/:productId
// @access  Privé
export const addToFavorites = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $addToSet: { favorites: req.params.productId } },
      { new: true }
    ).populate('favorites');

    res.json({
      success: true,
      data: user.favorites,
      message: 'Produit ajouté aux favoris'
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Retirer un produit des favoris
// @route   DELETE /api/users/favorites/:productId
// @access  Privé
export const removeFromFavorites = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { favorites: req.params.productId } },
      { new: true }
    ).populate('favorites');

    res.json({
      success: true,
      data: user.favorites,
      message: 'Produit retiré des favoris'
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Récupérer les favoris
// @route   GET /api/users/favorites
// @access  Privé
export const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('favorites');
    
    res.json({
      success: true,
      data: user.favorites
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};