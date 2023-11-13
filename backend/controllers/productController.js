const Product = require('../models/Product');

//Fetching all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Fetching a product by ID
const getProductById = async (req, res) => {
  try {
    const productId = req.params.id.trim();
    //console.log('Fetching product with ID:', productId);
    const product = await Product.findById(productId);
    if (!product) {
      console.log('Product not found');
      return res.status(404).json({ error: 'Product not found' });
    }
    console.log('Product found:', product);
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: error.message });
  }
};

//Create
const createProduct = async (req, res) => {
  try {
    const { productName, description, price, imageUrls } = req.body;
    const newProduct = new Product({ productName, description, price, imageUrls });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/*Update*/
const updateProductById = async (req, res) => {
  try {
    const productId = req.params.id.trim();
    const { productName, description, price, imageUrls } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { productName, description, price, imageUrls },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/*Delete*/
const deleteProductById = async (req, res) => {
  try {
    const productId = req.params.id.trim();
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(deletedProduct);
  } catch (error) {
    console.error('Error deleting product:', error.message);
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};
