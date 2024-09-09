# Recipe API with Ingredient Substitutions

## Deployed API URL
Base URL: `https://findrecipe.vercel.app/`

## Endpoints
### 1. Search Recipes by Ingredients
- **URL**: `/api/recipes`
- **Method**: `GET`
- **Query Parameters**:
  - `ingredients` (comma-separated list of ingredients)
  - `dietaryPreferences` (optional, e.g., `vegan`)
- **Example**: `/api/recipes?ingredients=tomato,cheese,bread&dietaryPreferences=vegan`
  
### 2. Get Vegan Substitutions for an Ingredient
- **URL**: `/api/substitute/:ingredient`
- **Method**: `GET`
- **Path Parameter**: `ingredient` (e.g., `milk`)
- **Example**: `/api/substitute/milk`

## Example Response
```json
[
  {
    "title": "Tomato Cheese Sandwich",
    "usedIngredientCount": 2,
    "missedIngredientCount": 1
  }
]
