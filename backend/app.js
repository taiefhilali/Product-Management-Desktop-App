// server.js
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/UserRoute');
const familleRoutes = require('./routes/FamillesRoutes');
const marqueRoutes = require('./routes/MarquesRoutes');
const articleRoutes = require('./routes/ArticlesRoutes');

const sequelize = require('./config/db');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Initialize app
const app = express();


// Middleware to parse JSON
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Set the directory for views (optional, defaults to './views')
app.set('views', __dirname + '/views');
// Routes Middleware
app.use('/api/users', userRoutes);
app.use('/api/familles', familleRoutes);
app.use('/api/marques', marqueRoutes);
app.use('/api/articles', articleRoutes);

app.use('/uploads', express.static('uploads'));

// Sync database
sequelize.sync().then(() => {
  console.log('Database synced');
  // Start server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch((err) => console.error('Error syncing database: ', err));
