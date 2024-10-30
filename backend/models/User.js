// models/user.js
const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prenom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  adresse: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ville: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tel1: {
    type: DataTypes.STRING, 
    allowNull: false,
    validate: {
      isNumeric: true,
    },
  },
  tel2: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isNumeric: true,
    },
  },
  cin: { // Adding the CIN field  
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // CIN should be unique to each user
    validate: {
      isNumeric: true, // Ensuring it's a numeric value
      len: [8, 8], // Assuming the CIN is exactly 8 digits long
    },
  },
  profileImage: { // Adding the profile image field
    type: Sequelize.STRING,
    allowNull: true, // Profile image can be optional
    // validate: {
    //   isUrl: true, // Ensures it's a valid URL
    // },
  },
  password: { type: DataTypes.STRING, allowNull: true } // Ensure password field is defined and non-nullable

}, {
  sequelize,
  tableName: 'users',
  timestamps: true,
});

module.exports = User;
