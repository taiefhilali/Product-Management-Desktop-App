const express = require('express');
const {
  addFamille,
  getAllFamilles,
  updateFamille,
  deleteFamille,
  getFamilleById
} = require('../controllers/FamillesController');

const router = express.Router();

// Routes for Familles
router.post('/add', addFamille);       // Add a new Famille
router.get('/', getAllFamilles);       // Get all Familles
router.put('/update/:id', updateFamille);  // Update a Famille by ID
router.delete('/delete/:id', deleteFamille); // Delete a Famille by ID
router.get('/find/:id', getFamilleById);     // Get a Famille by ID

module.exports = router;
