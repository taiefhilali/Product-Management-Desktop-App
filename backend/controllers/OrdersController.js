const { Order, Article, OrderArticles } = require('../models'); // Adjust path as needed
const User = require('../models/User'); // Adjust path if necessary

const addToCart = async (req, res) => {
  try {
    const { userId, cartItems, totalPrice } = req.body;

    // Verify if the user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create the order
    const order = await Order.create({  
      userId: userId,
      totalPrice: totalPrice,

    });

    // Add articles to the order
    const orderArticlesData = await Promise.all(cartItems.map(async (item) => {
      const article = await Article.findByPk(item.articleId); // Ensure the article exists
      if (!article) {
        throw new Error(`Article with ID ${item.articleId} not found`);
      }

      return {
        orderId: order.id,
        articleId: item.articleId,
        quantity: item.quantity,
        price: item.price,
      };
    }));

    // Bulk insert order-article relationships in the join table
    await OrderArticles.bulkCreate(orderArticlesData);

    res.status(200).json({ message: "Order created successfully!" });
  } catch (error) {
    console.error("Error creating order", error);
    res.status(500).json({ message: "Error creating order" });
  }
};

  module.exports = { addToCart };
