const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Article = require('./Article'); // Your existing Article model

const Order = sequelize.define('Order', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', // The name of the User model table
      key: 'id', // Adjust to match your User model's primary key
    },
  },
  totalPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
//   paymentMethod: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
//   shippingAddress: {
//     type: DataTypes.JSONB,
//     allowNull: false,
//   },
}, {
  sequelize,
  tableName: 'orders',
  timestamps: true,
});

// Define the join table for Order-Article with additional fields
const OrderArticles = sequelize.define('OrderArticles', {
  orderId: {
    type: DataTypes.INTEGER,
    references: {
      model: Order,
      key: 'id',
    },
    primaryKey: true,
  },
  articleId: {
    type: DataTypes.INTEGER,
    references: {
      model: Article,
      key: 'id',
    },
    primaryKey: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'order_articles',
  timestamps: false,
});

// Establish many-to-many relationships
Order.belongsToMany(Article, { through: OrderArticles, foreignKey: 'orderId', as: 'articles' });
Article.belongsToMany(Order, { through: OrderArticles, foreignKey: 'articleId', as: 'orders' });

module.exports = { Order, Article, OrderArticles };
