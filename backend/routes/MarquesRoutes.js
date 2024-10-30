const express = require('express');
const {
  addMarque,
  getAllMarques,
  updateMarque,
  deleteMarque,
  getMarqueById
} = require('../controllers/MarquesController');

const router = express.Router();

// Routes for Marques
router.post('/add', addMarque);           // Add a new Marque
router.get('/', getAllMarques);           // Get all Marques
router.put('/update/:id', updateMarque);  // Update a Marque by ID
router.delete('/delete/:id', deleteMarque); // Delete a Marque by ID
router.get('/find/:id', getMarqueById);   // Get a Marque by ID

module.exports = router;
