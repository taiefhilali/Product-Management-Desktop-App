const Article = require('../models/Article');
const Familles = require('../models/Familles');
const Marques = require('../models/Marques');

// Add a new Article
const addArticle = async (req, res) => {
  try {
    const { codeABar, designation, prixDeVenteTTC, familleId, marqueId } = req.body;

    // Check if the barcode already exists
    const existingArticle = await Article.findOne({ where: { codeABar } });
    if (existingArticle) {
      return res.status(400).json({ error: 'Article with this barcode already exists.' });
    }

    // Create a new Article
    const newArticle = await Article.create({ codeABar, designation, prixDeVenteTTC, familleId, marqueId });
    res.status(201).json({ message: 'Article added successfully', article: newArticle });
  } catch (error) {
    console.error('Error adding Article:', error);
    res.status(500).json({ error: 'Server error while adding Article.' });
  }
};

// Get all Articles
const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.findAll({
      include: [
        { model: Familles, as: 'famille' },
        { model: Marques, as: 'marque' }
      ]
    });
    res.status(200).json(articles);
  } catch (error) {
    console.error('Error fetching Articles:', error);
    res.status(500).json({ error: 'Server error while fetching Articles.' });
  }
};

// Update an existing Article
const updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const { codeABar, designation, prixDeVenteTTC, familleId, marqueId } = req.body;

    // Find the Article by ID
    const article = await Article.findByPk(id);
    if (!article) {
      return res.status(404).json({ error: 'Article not found.' });
    }

    // Update the Article
    article.codeABar = codeABar || article.codeABar;
    article.designation = designation || article.designation;
    article.prixDeVenteTTC = prixDeVenteTTC || article.prixDeVenteTTC;
    article.familleId = familleId || article.familleId;
    article.marqueId = marqueId || article.marqueId;

    // Save changes
    await article.save();
    res.status(200).json({ message: 'Article updated successfully', article });
  } catch (error) {
    console.error('Error updating Article:', error);
    res.status(500).json({ error: 'Server error while updating Article.' });
  }
};

// Delete an Article
const deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the Article by ID
    const article = await Article.findByPk(id);
    if (!article) {
      return res.status(404).json({ error: 'Article not found.' });
    }

    // Delete the Article
    await article.destroy();
    res.status(200).json({ message: 'Article deleted successfully' });
  } catch (error) {
    console.error('Error deleting Article:', error);
    res.status(500).json({ error: 'Server error while deleting Article.' });
  }
};

// Get Article by ID
const getArticleById = async (req, res) => {
  const { id } = req.params;

  try {
    const article = await Article.findByPk(id, {
      include: [
        { model: Familles, as: 'famille' },
        { model: Marques, as: 'marque' }
      ]
    });

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.status(200).json(article);
  } catch (error) {
    console.error('Error fetching Article:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  addArticle,
  getAllArticles,
  updateArticle,
  deleteArticle,
  getArticleById,
};
