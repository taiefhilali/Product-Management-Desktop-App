const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/db');

const Familles = sequelize.define('Familles', {
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // The code should be unique for each family
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
  tableName: 'familles',
  timestamps: true,
});

module.exports = Familles;
