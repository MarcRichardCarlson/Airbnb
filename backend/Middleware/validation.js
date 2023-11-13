// validation.js
module.exports = {
    validateProductData: (req, res, next) => {
      const { productName, price } = req.body;
  
      if (!productName || !price) {
        return res.status(400).json({ message: 'Name and price are required' });
      }
  
      // Additional validation checks can be added
  
      next();
    },
    
    // Other validation middleware functions here
  };
    