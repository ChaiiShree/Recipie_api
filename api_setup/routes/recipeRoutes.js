const express = require('express');
const { getRecipesByIngredients, getNutritionalData } = require('../controller/recipeController');
const router = express.Router();

// Route to search recipes by ingredients
router.get('/recipes', getRecipesByIngredients);

// Route to get nutritional data for a specific recipe
router.get('/nutrition', getNutritionalData);

module.exports = router;
