import Product from '../models/Product.js';

// @desc    Récupérer tous les produits
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    const {
      category,
      brand,
      featured,
      search,
      page = 1,
      limit = 12,
      sort = 'createdAt'
    } = req.query;

    let query = {};

    // Filtres
    if (category) query.category = category;
    if (brand) query.brand = brand;
    if (featured) query.featured = featured === 'true';
    if (search) {
      query.$text = { $search: search };
    }

    const products = await Product.find(query)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Product.countDocuments(query);

    res.json({
      success: true,
      data: products,
      pagination: {
        current: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalProducts: total,
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Récupérer un produit par ID
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }

    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};