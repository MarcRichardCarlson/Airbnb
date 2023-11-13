const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const validationMiddleware = require('../Middleware/validation');

router.get('/', productController.getProducts);
router.post('/', productController.createProduct);
router.get('/:id', productController.getProductById);
router.put('/:id', productController.updateProductById);
router.delete('/:id', productController.deleteProductById);

module.exports = router;