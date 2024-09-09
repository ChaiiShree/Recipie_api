import React, { useState } from 'react';
import axios from 'axios';
import './RecipeSearch.css';

const RecipeSearch = () => {
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState('');

  const searchRecipes = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`https://recipie-api-zeta.vercel.app/api/recipes?ingredients=${ingredients}`);
      setRecipes(response.data);
      setError('');
    } catch (err) {
      setError('Error fetching recipes, please try again.');
      setRecipes([]);
    }
  };

  return (
    <div className="recipe-search-container">
      <h1>Recipe Finder</h1>
      <form onSubmit={searchRecipes}>
        <input
          type="text"
          placeholder="Enter ingredients (comma-separated)"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          required
        />
        <button type="submit">Search</button>
      </form>
      
      {error && <p className="error">{error}</p>}

      <div className="recipe-results">
        {recipes.length > 0 ? (
          recipes.map((recipe, index) => (
            <div key={index} className="recipe-card">
              <h3>{recipe.title}</h3>
              <p>Ingredients used: {recipe.usedIngredientCount}</p>
              <p>Missing ingredients: {recipe.missedIngredientCount}</p>
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
