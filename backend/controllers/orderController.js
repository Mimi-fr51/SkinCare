import Order from '../models/Order.js';
import Product from '../models/Product.js';
import { sendOrderConfirmation } from '../utils/emailService.js';

// @desc    Créer une commande
// @route   POST /api/orders
// @access  Privé
export const createOrder = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    // Validation
    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: 'Aucun article dans la commande' });
    }

    // Vérifier le stock
    for (let item of orderItems) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ message: `Produit ${item.name} non trouvé` });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({ 
          message: `Stock insuffisant pour ${item.name}. Disponible: ${product.stock}` 
        });
      }
    }

    // Créer la commande
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    // Mettre à jour le stock
    for (let item of orderItems) {
      await Product.findByIdAndUpdate(
        item.product,
        { $inc: { stock: -item.quantity } }
      );
    }

    // Envoyer email de confirmation
    await sendOrderConfirmation(req.user, createdOrder);

    res.status(201).json({
      success: true,
      data: createdOrder,
      message: 'Commande créée avec succès'
    });

  } catch (error) {
    res.status(400).json({ 
      success: false,
      message: error.message 
    });
  }
};

// @desc    Récupérer les commandes de l'utilisateur
// @route   GET /api/orders
// @access  Privé
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('user', 'firstName lastName email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: orders
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

// @desc    Récupérer une commande par ID
// @route   GET /api/orders/:id
// @access  Privé
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'firstName lastName email');

    if (!order) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }

    // Vérifier que l'utilisateur est propriétaire de la commande ou admin
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Accès non autorisé' });
    }

    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};