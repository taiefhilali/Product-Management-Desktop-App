const { DataTypes, Sequelize  } = require('sequelize');
const sequelize = require('../config/db');
const Familles = require('./Familles');
const Marques = require('./Marques');

const Article = sequelize.define('Article', {
  codeABar: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Each article should have a unique barcode
  },
  designation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prixDeVenteTTC: {
    type: DataTypes.DECIMAL(10, 2), // To handle currency with decimal precision
    allowNull: false,
  },
  familleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Familles,
      key: 'id', // Assuming `id` is the primary key in Familles
    },
  },
  marqueId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Marques,
      key: 'id', // Assuming `id` is the primary key in Marques
    },
  },
  Image: { // Adding the profile image field
    type: Sequelize.STRING,
    allowNull: true, // Profile image can be optional
    // validate: {
    //   isUrl: true, // Ensures it's a valid URL
    // },
  },
}, {
  sequelize,
  tableName: 'articles',
  timestamps: true,
});

// Define relationships
Article.belongsTo(Familles, { foreignKey: 'familleId', as: 'famille' });
Article.belongsTo(Marques, { foreignKey: 'marqueId', as: 'marque' });

module.exports = Article;
