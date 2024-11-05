// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path to your User model

// Middleware to verify token and retrieve user data
async function authenticateToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1]; // Assuming token is in "Bearer <token>" format

  if (!token) return res.status(401).json({ message: 'Access token missing' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure JWT_SECRET is set in your environment
    req.user = await User.findByPk(decoded.userId); // Use `findByPk` if using Sequelize, `findById` for Mongoose

    if (!req.user) return res.status(404).json({ message: 'User not found' });

    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
}

module.exports = authenticateToken;
