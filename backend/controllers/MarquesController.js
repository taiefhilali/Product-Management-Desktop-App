const Marques = require('../models/Marques');

// Add a new Marque
const addMarque = async (req, res) => {
  try {
    const { code, designation, libelle } = req.body;

    // Check if the code already exists
    const existingMarque = await Marques.findOne({ where: { code } });
    if (existingMarque) {
      return res.status(400).json({ error: 'Marque with this code already exists.' });
    }

    // Create new Marque
    const newMarque = await Marques.create({ code, designation, libelle });
    res.status(201).json({ message: 'Marque added successfully', marque: newMarque });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while adding Marque.' });
  }
};

// Get all Marques
const getAllMarques = async (req, res) => {
  try {
    const marques = await Marques.findAll();
    res.status(200).json(marques);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while fetching Marques.' });
  }
};

// Update an existing Marque
const updateMarque = async (req, res) => {
  try {
    const { id } = req.params;
    const { code, designation, libelle } = req.body;

    // Find the Marque by ID
    const marque = await Marques.findByPk(id);
    if (!marque) {
      return res.status(404).json({ error: 'Marque not found.' });
    }

    // Update the Marque
    marque.code = code || marque.code;
    marque.designation = designation || marque.designation;
    marque.libelle = libelle || marque.libelle;

    // Save changes
    await marque.save();
    res.status(200).json({ message: 'Marque updated successfully', marque });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while updating Marque.' });
  }
};

// Delete a Marque
const deleteMarque = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the Marque by ID
    const marque = await Marques.findByPk(id);
    if (!marque) {
      return res.status(404).json({ error: 'Marque not found.' });
    }

    // Delete the Marque
    await marque.destroy();
    res.status(200).json({ message: 'Marque deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while deleting Marque.' });
  }
};

// Get Marque by ID
const getMarqueById = async (req, res) => {
  const { id } = req.params; // Get the ID from the request parameters

  try {
    // Use findByPk to find the Marque by its primary key
    const marque = await Marques.findByPk(id);

    if (!marque) {
      return res.status(404).json({ message: 'Marque not found' });
    }

    res.status(200).json(marque);
  } catch (error) {
    console.error('Error fetching Marque:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  addMarque,
  getAllMarques,
  updateMarque,
  deleteMarque,
  getMarqueById,
};
