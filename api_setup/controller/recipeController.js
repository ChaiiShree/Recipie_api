// controllers/recipeController.js

const axios = require('axios');

// Fetch recipes from Spoonacular based on available ingredients
exports.getRecipesByIngredients = async (req, res) => {
    const { ingredients, dietaryPreferences } = req.query;
  
    console.log('Spoonacular API Key:', process.env.RECIPE_API_KEY);
    console.log('Requested Ingredients:', ingredients);
  
    try {
      const spoonacularUrl = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=5&apiKey=${process.env.RECIPE_API_KEY}`;
      console.log('Spoonacular URL:', spoonacularUrl); // Log URL for debugging
  
      const spoonacularResponse = await axios.get(spoonacularUrl);
      const recipes = spoonacularResponse.data;
  
      // Filter recipes by dietary preferences, but first ensure that 'diets' exists in the recipe object
      if (dietaryPreferences) {
        const filteredRecipes = recipes.filter(recipe => 
          recipe.diets && recipe.diets.includes(dietaryPreferences.toLowerCase())
        );
        return res.status(200).json(filteredRecipes);
      }
  
      res.status(200).json(recipes);
    } catch (error) {
      console.error('Error fetching recipes:', error.response ? error.response.data : error.message);
      res.status(500).json({ message: 'Error fetching recipes from Spoonacular.', error: error.response ? error.response.data : error.message });
    }
  };
  // Fetch vegan/ingredient substitutions from Spoonacular
exports.getVeganSubstitutions = async (req, res) => {
  const { ingredient } = req.params;

  console.log('Requested Ingredient:', ingredient); // Log the requested ingredient

  try {
    const spoonacularUrl = `https://api.spoonacular.com/food/ingredients/substitutes?ingredientName=${ingredient}&apiKey=${process.env.RECIPE_API_KEY}`;
    console.log('Substitution URL:', spoonacularUrl); // Log URL for debugging

    const spoonacularResponse = await axios.get(spoonacularUrl);
    const { substitutes } = spoonacularResponse.data;

    if (substitutes && substitutes.length > 0) {
      res.status(200).json({ original: ingredient, veganAlternative: substitutes });
    } else {
      res.status(404).json({ message: "No substitutions found for this ingredient." });
    }
  } catch (error) {
    console.error('Error fetching substitutions:', error.response ? error.response.data : error.message);
    res.status(500).json({ message: 'Error fetching ingredient substitutions from Spoonacular.', error: error.response ? error.response.data : error.message });
  }
};
