import React, { useState, useEffect } from 'react';
import SimpleRecipeCard from './SimpleRecipeCard';
import { handleEdit, handleDelete } from '../utils/recipeActions';

const RecipeList = () => {
    const [recipe, setRecipe] = useState([]);
    const [currentUser, setCurrentUser] = useState(null); // currentUser állapot hozzáadása

    useEffect(() => {
        // Receptadatok lekérdezése
        fetch("/cookbook/recipes/")
            .then(res => res.json())
            .then((data) => {
                console.log("Lekérdezett adatok:", data);
                setRecipe(data);
            });

        // Bejelentkezett felhasználó lekérdezése
        fetch('/users/api/')
            .then(response => response.json())
            .then(data => setCurrentUser(data.username))
            .catch(error => console.error("Hiba a felhasználói adatok lekérdezésekor:", error));
    }, []);
        
    return (
        <section>
        { Array.isArray(recipe) ? recipe.map(recipe => 
            <SimpleRecipeCard 
                key={recipe.id}
                {...recipe}
                currentUser={currentUser} 
                onEdit={() => handleEdit(recipe.id)}
                onDelete={() => handleDelete(recipe.id, setRecipe)}
            />
        ) : <p>Nem találtunk recepteket.</p>}
        </section>
    );
}

export default RecipeList;
