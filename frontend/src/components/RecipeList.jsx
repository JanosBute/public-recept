import React, { useState, useEffect } from 'react';
import SimpleRecipeCard from './SimpleRecipeCard';
import IngredientFilter from './IngredientFilter';
import { handleEdit, handleDelete } from '../utils/recipeActions';
import './RecipeList.css';

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [filteredIngredients, setFilteredIngredients] = useState([]);

    useEffect(() => {
        fetchRecipes();
        fetchCurrentUser();
    }, [filteredIngredients]);

    const fetchRecipes = () => {
        let query = '';
        if (filteredIngredients.length > 0) {
            query = `?ingredients=${filteredIngredients.join(',')}`;
        }

        fetch(`/cookbook/recipes/${query}`)
            .then(res => res.json())
            .then((data) => {
                console.log("Lekérdezett receptek:", data);
                setRecipes(data);
            })
            .catch(error => console.error('Hiba a receptek lekérdezésekor:', error));
    };

    const fetchCurrentUser = () => {
        fetch('/users/api/')
            .then(response => response.json())
            .then(data => {
                console.log("Bejelentkezett felhasználó adatai:", data);
                setCurrentUser(data);
            })
            .catch(error => console.error("Hiba a felhasználói adatok lekérdezésekor:", error));
    };

    return (
        <section className='list-section'>
            <IngredientFilter onFilterChange={setFilteredIngredients} />
            {Array.isArray(recipes) && recipes.length > 0 ? (
                recipes.map((recipe) => (
                    <SimpleRecipeCard
                        key={recipe.id}
                        {...recipe}
                        currentUser={currentUser}
                        onEdit={() => handleEdit(recipe.id)}
                        onDelete={() => handleDelete(recipe.id, setRecipes)}
                    />
                ))
            ) : (
                <p>Nincsenek találatok.</p>
            )}
        </section>
    );
};

export default RecipeList;
