const express = require("express");
const cors = require("cors");
require("dotenv").config();


const app = express();
const corsOptions = {
    origin: '*', // Allow requests from any origin (for testing purposes)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };
  
  app.use(cors(corsOptions));
app.use(express.json());

// Route files
const productRoutes = require("./routes/products");
const userRoutes = require("./routes/users");
//const cartRoutes = require("./routes/cart");

// Use the route files with appropriate prefixes
app.use("/products", productRoutes);
app.use("/users", userRoutes);
//app.use("/cart", cartRoutes);

// Add any additional middleware or configuration you require

module.exports = app;
