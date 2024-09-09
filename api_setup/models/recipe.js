const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  name: String,
  amount: String,
  unit: String,
  veganAlternative: String, // Optional field for vegan substitution
});

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ingredients: [ingredientSchema],
  instructions: { type: String, required: true },
  dietaryPreferences: [String], // e.g., ["vegan", "gluten-free"]
  allergies: [String], // e.g., ["nuts", "dairy"]
});

module.exports = mongoose.model('Recipe', recipeSchema);
