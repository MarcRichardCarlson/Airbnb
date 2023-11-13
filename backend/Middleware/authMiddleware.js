const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

const authenticateUser = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token || !token.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access denied' });
  }

  const tokenWithoutBearer = token.slice(7); // Remove "Bearer " prefix
  try {
    const decoded = jwt.verify(tokenWithoutBearer, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = {
  authenticateUser,
};
