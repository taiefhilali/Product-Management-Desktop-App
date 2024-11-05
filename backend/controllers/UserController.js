const User = require('../models/User');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const registerUser = async (req, res) => {
  try {
      const { nom, prenom, email, adresse, ville, tel1, tel2, cin, password } = req.body;
      
      if (!password) {
          return res.status(400).json({ error: 'Password is required' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = await User.create({
          nom,
          prenom,
          email,
          adresse,
          ville,
          tel1,
          tel2,
          cin,
          profileImage: req.file.path, // Use the path from Multer
          password: hashedPassword
      });

      res.status(201).json({
          message: 'User registered successfully',
          user: newUser,
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
  }
};

  



const loginUser = async (req, res) => {
  try {
    const { identifier, password } = req.body; // identifier can be CIN or email

    // Find user by CIN or email
    const user = await User.findOne({
      where: {
        [Op.or]: [
          { cin: identifier }, // Match by CIN
          { email: identifier } // Match by email
        ]
      }
    });

    // If user not found, return error
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Successful login, generate JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '50d' }); // Set an expiration time for the token

    // Save the token to the user's record in the database
    await User.update({ token }, { where: { id: user.id } });

    // Respond with user data and the token
    res.status(200).json({
      message: 'Login successful',
      token, // Include the token in the response
      user: {
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        cin: user.cin,
        profileImage: user.profileImage
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};


// controllers/userController.js
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll(); // Fetch all users from the database
    res.json(users); // Return the user data as JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' }); // Send an error response as JSON
  }
};

// Controller function to get the logged-in user's information
const getCurrentUser = async (req, res) => {
  try {
    // `req.user` contains the authenticated user set in the middleware
    const user = req.user;

    // Respond with selected user information
    res.json({
      nom: user.nom,
      prenom: user.prenom,
      email: user.email,
      adresse: user.adresse,
      ville: user.ville,
      country: user.country || 'Tunisia', // Provide defaults if needed
      postalCode: user.postalCode || '437300',
      tel1: user.tel1,
      tel2: user.tel2,
      cin: user.cin,
      profileImage: user.profileImage,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user data' });
  }
};

module.exports = { registerUser, loginUser,getAllUsers,getCurrentUser };
