import React from 'react'
import { useState, useEffect } from 'react';
import SimpleRecipeCard from './SimpleRecipeCard';

const RecipeList = () => {
  
    const [recipe, setRecipe] = useState([])

    useEffect(() =>{
        fetch("http://127.0.0.1:8000/cookbook/recipes/")
        .then(res => res.json())
        .then(data => setRecipe(data))
        }, []);
        
    return (
        <section>
        { Array.isArray(recipe) ? recipe.map(recipe => <SimpleRecipeCard key={recipe.id} {...recipe} />) : <p>Nem találtunk recepteket.</p>}
        </section>
  )
}

export default RecipeList
