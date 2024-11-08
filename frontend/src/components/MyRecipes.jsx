import React, { useEffect, useState } from 'react';
import RecipeCard from './RecipeCard';
import { handleDelete, handleEdit } from '../utils/recipeActions';

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [currentUser, setCurrentUser] = useState(null); // Bejelentkezett felhasználó tárolása

  useEffect(() => {
    // Saját receptek lekérdezése
    fetch('/cookbook/recipes/my/')
      .then(response => response.json())
      .then(data => setRecipes(data))
      .catch(error => console.error("Hiba a saját receptek lekérdezésekor:", error));

    // Bejelentkezett felhasználó lekérdezése
    fetch('/users/api/')
      .then(response => response.json())
      .then(data => setCurrentUser(data.username))
      .catch(error => console.error("Hiba a felhasználói adatok lekérdezésekor:", error));
  }, []);

  const handleDeleteWithState = (recipeId) => handleDelete(recipeId, setRecipes);

  return (
    <div>
      <h2>Saját receptek</h2>
      {recipes.length > 0 ? (
        recipes.map(recipe => (
          <RecipeCard
            key={recipe.id}
            id={recipe.id}
            image={recipe.image}
            name={recipe.name}
            ingredients={recipe.ingredients}
            description={recipe.description}
            preparation={recipe.preparation}
            author={recipe.author}
            currentUser={currentUser}
            onEdit={handleEdit}
            onDelete={() => handleDeleteWithState(recipe.id)}          />
        ))
      ) : (
        <p>Nincsenek saját receptjeid.</p>
      )}
    </div>
  );
};

export default MyRecipes;
