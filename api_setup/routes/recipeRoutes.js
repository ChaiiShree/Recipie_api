const express = require('express');
const { getRecipesByIngredients, getVeganSubstitutions } = require('../controller/recipeController');
const router = express.Router();

// Route to search recipes by ingredients
router.get('/recipes', getRecipesByIngredients);

// Route to get ingredient substitutions
router.get('/substitute/:ingredient', getVeganSubstitutions);

module.exports = router;
