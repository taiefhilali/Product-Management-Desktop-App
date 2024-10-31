const express = require('express');
const {
  addArticle,
  getAllArticles,
  updateArticle,
  deleteArticle,
  getArticleById
} = require('../controllers/ArticlesController');

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
// Routes for Articles
router.post('/add',upload.single('Image'), addArticle);          // Add a new Article
router.get('/', getAllArticles);          // Get all Articles
router.put('/update/:id', updateArticle); // Update an Article by ID
router.delete('/delete/:id', deleteArticle); // Delete an Article by ID
router.get('/find/:id', getArticleById);  // Get an Article by ID

module.exports = router;
