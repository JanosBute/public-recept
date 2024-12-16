import React, { useEffect, useState } from 'react';
import SimpleRecipeCard from './SimpleRecipeCard';
import { handleDelete, handleEdit } from '../utils/recipeActions';
import './RecipeList.css';  // Importáljuk a CSS-t


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
      .then(data => setCurrentUser(data))
      .catch(error => console.error("Hiba a felhasználói adatok lekérdezésekor:", error));
  }, []);


  return (
    <div>
      <h2>Saját receptek</h2>
      <section className='list-section'>
        { Array.isArray(recipes) ? recipes.map(recipe => 
            <SimpleRecipeCard 
                key={recipe.id}
                {...recipe}
                currentUser={currentUser} 
                onEdit={() => handleEdit(recipe.id)}
                onDelete={() => handleDelete(recipe.id, setRecipes)}
            />
        ) : <p>Nem találtunk recepteket.</p>}
        </section>
    </div>
  );
};

export default MyRecipes;


