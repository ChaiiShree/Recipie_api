import React, { useState } from 'react';
import axios from 'axios';
import './RecipeSearch.css';

const RecipeSearch = () => {
  const [ingredients, setIngredients] = useState('');
  const [cuisineType, setCuisineType] = useState('');
  const [mealType, setMealType] = useState('');
  const [diet, setDiet] = useState('');
  const [health, setHealth] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState('');

  const searchRecipes = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`https://your-backend-api.com/api/recipes?ingredients=${ingredients}&cuisineType=${cuisineType}&mealType=${mealType}&diet=${diet}&health=${health}`);
      setRecipes(response.data);
      setError('');
    } catch (err) {
      setError('Error fetching recipes, please try again.');
      setRecipes([]);
    }
  };

  const viewRecipeDetails = async (uri) => {
    try {
      const response = await axios.get(`https://your-backend-api.com/api/nutrition?uri=${encodeURIComponent(uri)}`);
      console.log(response.data);
    } catch (err) {
      setError('Error fetching recipe details, please try again.');
    }
  };

  return (
    <div className="recipe-search-container">
      <h1>Recipe Finder</h1>
      <form onSubmit={searchRecipes}>
        <input type="text" placeholder="Enter ingredients (comma-separated)" value={ingredients} onChange={(e) => setIngredients(e.target.value)} required />
        
        <select value={cuisineType} onChange={(e) => setCuisineType(e.target.value)}>
          <option value="">Cuisine Type</option>
          <option value="american">American</option>
          <option value="asian">Asian</option>
          {/* Add other options */}
        </select>
        
        <select value={mealType} onChange={(e) => setMealType(e.target.value)}>
          <option value="">Meal Type</option>
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
        </select>
        
        <select value={diet} onChange={(e) => setDiet(e.target.value)}>
          <option value="">Diet</option>
          <option value="high-protein">High-Protein</option>
          <option value="low-fat">Low-Fat</option>
        </select>
        
        <select value={health} onChange={(e) => setHealth(e.target.value)}>
          <option value="">Health Label</option>
          <option value="vegan">Vegan</option>
          <option value="gluten-free">Gluten-Free</option>
          {/* Add other health options */}
        </select>

        <button type="submit">Search</button>
      </form>

      {error && <p className="error">{error}</p>}

      <div className="recipe-results">
        {recipes.length > 0 ? (
          recipes.map((recipe, index) => (
            <div key={index} className="recipe-card" onClick={() => viewRecipeDetails(recipe.uri)}>
              <h3>{recipe.label}</h3>
              <p>Ingredients: {recipe.ingredientLines.join(', ')}</p>
              <p>Servings: {recipe.yield}</p>
              <a href={recipe.url} target="_blank" rel="noopener noreferrer">View Full Recipe</a>
            </div>
          ))
        ) : (
          <p>No recipes found. Try different ingredients.</p>
        )}
      </div>
    </div>
  );
};

export default RecipeSearch;
