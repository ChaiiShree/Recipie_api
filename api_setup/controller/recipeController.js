const axios = require('axios');

// Search recipes by ingredients and filters
exports.getRecipesByIngredients = async (req, res) => {
  const { ingredients, cuisineType, mealType, diet, health } = req.query;

  try {
    const edamamUrl = `https://api.edamam.com/search?q=${ingredients}&app_id=${process.env.RECIPE_API_ID}&app_key=${process.env.RECIPE_API_KEY}&cuisineType=${cuisineType}&mealType=${mealType}&diet=${diet}&health=${health}`;
    
    const edamamResponse = await axios.get(edamamUrl);
    const recipes = edamamResponse.data.hits.map(hit => hit.recipe);
    
    res.status(200).json(recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error.message);
    res.status(500).json({ message: 'Error fetching recipes from Edamam.' });
  }
};

// Fetch detailed nutritional information for a recipe
exports.getNutritionalData = async (req, res) => {
  const { uri } = req.query;  // Recipe URI
  try {
    const edamamUrl = `https://api.edamam.com/api/recipes/v2/${encodeURIComponent(uri)}?type=public&app_id=${process.env.RECIPE_API_ID}&app_key=${process.env.RECIPE_API_KEY}`;
    
    const edamamResponse = await axios.get(edamamUrl);
    const recipe = edamamResponse.data.recipe;
    
    res.status(200).json(recipe);
  } catch (error) {
    console.error('Error fetching recipe details:', error.message);
    res.status(500).json({ message: 'Error fetching recipe details from Edamam.' });
  }
};
