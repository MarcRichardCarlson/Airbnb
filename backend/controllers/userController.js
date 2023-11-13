const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

// Register a new user controller
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    console.log(req.body);

    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const loginUser = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email: email.trim() });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id, email: user.email }, SECRET_KEY, {
      expiresIn: '24h',
    });

    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'An error occurred during login', specificError: error.message });
  }
};

// Update user details controller
const updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    // Logic to update user details based on req.body data
    // ...
    res.json({ message: 'User details updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete user controller
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(deletedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const logoutUser = async (req, res) => {
  try {
    const token = req.header('Authorization');
    
    if (!token || !token.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    const tokenWithoutBearer = token.slice(7); // Remove "Bearer " prefix
    
    // Verify the token asynchronously
    await jwt.verify(tokenWithoutBearer, SECRET_KEY);
    console.log('Decoded Token:', decoded);

    // Perform any necessary actions after logout, such as redirecting the user or clearing local state
    res.json({ message: 'User logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    // Handle logout error, such as displaying an error message to the user
    res.status(500).json({ error: 'An error occurred during logout', specificError: error.message });
  }
};

module.exports = logoutUser;



module.exports = {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  logoutUser,
};
