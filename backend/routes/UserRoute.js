// routes/userRoutes.js
const express = require('express');
const { registerUser,loginUser,getAllUsers } = require('../controllers/UserController');
const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const authenticateToken = require('../middlewares/auth');
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

router.get('/', getAllUsers);
router.post('/register',upload.single('profileImage'),registerUser);
router.post('/login',loginUser);
module.exports = router;
