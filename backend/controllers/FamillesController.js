const Familles = require('../models/Familles');

// Add a new Famille
const addFamille = async (req, res) => {
  try {
    const { code, designation, libelle } = req.body;

    // Check if the code already exists
    const existingFamille = await Familles.findOne({ where: { code } });
    if (existingFamille) {
      return res.status(400).json({ error: 'Famille with this code already exists.' });
    }

    // Create new Famille
    const newFamille = await Familles.create({ code, designation, libelle });
    res.status(201).json({ message: 'Famille added successfully', famille: newFamille });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while adding Famille.' });
  }
};

// Get all Familles
const getAllFamilles = async (req, res) => {
  try {
    const familles = await Familles.findAll();
    res.status(200).json(familles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while fetching Familles.' });
  }
};

// Update an existing Famille
const updateFamille = async (req, res) => {
  try {
    const { id } = req.params;
    const { code, designation, libelle } = req.body;

    // Find the Famille by ID
    const famille = await Familles.findByPk(id);
    if (!famille) {
      return res.status(404).json({ error: 'Famille not found.' });
    }

    // Update the Famille
    famille.code = code || famille.code;
    famille.designation = designation || famille.designation;
    famille.libelle = libelle || famille.libelle;

    // Save changes
    await famille.save();
    res.status(200).json({ message: 'Famille updated successfully', famille });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while updating Famille.' });
  }
};

// Delete a Famille
const deleteFamille = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the Famille by ID
    const famille = await Familles.findByPk(id);
    if (!famille) {
      return res.status(404).json({ error: 'Famille not found.' });
    }

    // Delete the Famille
    await famille.destroy();
    res.status(200).json({ message: 'Famille deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while deleting Famille.' });
  }
};
// Controller function to get Famille by ID

const getFamilleById = async (req, res) => {
    const { id } = req.params; // Get the ID from the request parameters
  
    try {
      // Use findByPk to find the Famille by its primary key
      const famille = await Familles.findByPk(id); 
  
      if (!famille) {
        return res.status(404).json({ message: 'Famille not found' });
      }
  
      res.status(200).json(famille);
    } catch (error) {
      console.error('Error fetching Famille:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

module.exports = {
  addFamille,
  getAllFamilles,
  updateFamille,
  deleteFamille,
  getFamilleById
};
