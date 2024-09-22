import React, { useState } from 'react';
import axios from 'axios';

// CSRF token cookie értékének kiolvasására
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          // Ellenőrizd, hogy ez-e a megfelelő cookie
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}

const csrfToken = getCookie('csrftoken');

const RecipeForm = () => {
  const [recipeData, setRecipeData] = useState({
    image: null,
    name: '',
    description: '',
    ingredients: [{ name: '', quantity: '', unit: '' }],
  });

    // Kép feltöltésének kezelése
    const handleImageChange = (e) => {
      setRecipeData({ ...recipeData, image: e.target.files[0] });
    };

  // Hozzávalók kezelésének kezelése
  const handleIngredientChange = (index, e) => {
    const { name, value } = e.target;
    const newIngredients = [...recipeData.ingredients];
    newIngredients[index][name] = value;
    setRecipeData({ ...recipeData, ingredients: newIngredients });
  };

  // Új hozzávaló hozzáadása
  const addIngredient = () => {
    setRecipeData({
      ...recipeData,
      ingredients: [...recipeData.ingredients, { name: '', quantity: '', unit: '' }],
    });
  };

  // Hozzávaló eltávolítása
  const removeIngredient = (index) => {
    const newIngredients = [...recipeData.ingredients];
    newIngredients.splice(index, 1);
    setRecipeData({ ...recipeData, ingredients: newIngredients });
  };

  // Űrlap beküldése
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', recipeData.name);
    formData.append('description', recipeData.description);
    formData.append('image', recipeData.image);

    recipeData.ingredients.forEach((ingredient, index) => {
      formData.append(`ingredients[${index}][name]`, ingredient.name);
      formData.append(`ingredients[${index}][quantity]`, ingredient.quantity);
      formData.append(`ingredients[${index}][unit]`, ingredient.unit);
    });

    try {
        const response = await axios.post('http://localhost:8000/api/recipe/', formData, {
        headers: {
          'X-CSRFToken': csrfToken,  // CSRF token
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,  // Ez biztosítja, hogy a cookie-k is elküldésre kerüljenek
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Recipe Name:</label>
        <input type="text" name="name" value={recipeData.name} onChange={(e) => setRecipeData({ ...recipeData, name: e.target.value })} />
      </div>

      <div>
        <label>Description:</label>
        <textarea name="description" value={recipeData.description} onChange={(e) => setRecipeData({ ...recipeData, description: e.target.value })} />
      </div>

      <div>
        <label>Recipe Image:</label>
        <input type="file" name="image" onChange={handleImageChange} />
      </div>

      <h3>Ingredients</h3>
      {recipeData.ingredients.map((ingredient, index) => (
        <div key={index}>
          <input
            type="text"
            name="name"
            placeholder="Ingredient name"
            value={ingredient.name}
            onChange={(e) => handleIngredientChange(index, e)}
          />
          <input
            type="text"
            name="quantity"
            placeholder="Quantity"
            value={ingredient.quantity}
            onChange={(e) => handleIngredientChange(index, e)}
          />
          <input
            type="text"
            name="unit"
            placeholder="Unit"
            value={ingredient.unit}
            onChange={(e) => handleIngredientChange(index, e)}
          />
          <button type="button" onClick={() => removeIngredient(index)}>
            Remove
          </button>
        </div>
      ))}

      <button type="button" onClick={addIngredient}>
        Add Ingredient
      </button>

      <button type="submit">Submit Recipe</button>
    </form>
  );
};

export default RecipeForm;
