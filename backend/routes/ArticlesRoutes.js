const express = require('express');
const {
  addArticle,
  getAllArticles,
  updateArticle,
  deleteArticle,
  getArticleById
} = require('../controllers/ArticlesController');

const router = express.Router();

// Routes for Articles
router.post('/add', addArticle);          // Add a new Article
router.get('/', getAllArticles);          // Get all Articles
router.put('/update/:id', updateArticle); // Update an Article by ID
router.delete('/delete/:id', deleteArticle); // Delete an Article by ID
router.get('/find/:id', getArticleById);  // Get an Article by ID

module.exports = router;
