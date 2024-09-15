const cors = require('cors');
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const recipeRoutes = require('../routes/recipeRoutes');

dotenv.config(); // Load environment variables

const app = express();

// CORS configuration
const corsOptions = {
  origin: ['http://localhost:3000', 'https://recipie-api-zeta.vercel.app'], // Frontend domains
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow necessary headers
};
app.use(cors(corsOptions));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Middleware to parse JSON
app.use(express.json());

// Recipe routes
app.use('/api', recipeRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
