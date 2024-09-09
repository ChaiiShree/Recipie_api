const cors = require('cors');
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const recipeRoutes = require('../routes/recipeRoutes');

dotenv.config(); // Load environment variables

const app = express();

const corsOptions = {
  origin: ['http://localhost:3000', 'https://recipie-api-zeta.vercel.app'], // Frontend domains
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow necessary headers
};
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Update this to restrict origins if needed
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

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
