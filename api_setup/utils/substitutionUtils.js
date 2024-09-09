const ingredientSubstitutions = {
    "milk": "almond milk",
    "butter": "vegan butter",
    "eggs": "flaxseed meal",
    "cheese": "nutritional yeast",
    // Add more substitutions as needed
  };
  
  const getVeganSubstitution = (ingredient) => {
    return ingredientSubstitutions[ingredient.toLowerCase()] || null;
  };
  
  module.exports = { getVeganSubstitution };
  