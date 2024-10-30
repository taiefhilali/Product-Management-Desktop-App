const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/db');

const Marques = sequelize.define('Marques', {
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // The code should be unique for each marque
  },
  designation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  libelle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'marques',
  timestamps: true,
});

module.exports = Marques;
