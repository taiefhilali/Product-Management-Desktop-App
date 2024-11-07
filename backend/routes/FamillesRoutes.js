const express = require('express');
const {
  addFamille,
  getAllFamilles,
  updateFamille,
  deleteFamille,
  getFamilleById
} = require('../controllers/FamillesController');
const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const router = express.Router();

// Set up Cloudinary storage for Multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'user_profiles', // Folder name in your Cloudinary account
      allowed_formats: ['jpg', 'jpeg', 'png'], // Allowed file formats
    },
  });
  
  const upload = multer({ storage: storage });

// Routes for Familles
router.post('/add', addFamille);       // Add a new Famille
router.get('/', getAllFamilles);       // Get all Familles
router.put('/update/:id', updateFamille);  // Update a Famille by ID
router.delete('/delete/:id', deleteFamille); // Delete a Famille by ID
router.get('/find/:id', getFamilleById);     // Get a Famille by ID

module.exports = router;
