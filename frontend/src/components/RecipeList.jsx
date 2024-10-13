import React from 'react'
import { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';

const RecipeList = () => {
  
    const [recipe, setRecipe] = useState([])

    useEffect(() =>{
        fetch("http://127.0.0.1:8000/cookbook/recipes/")
        .then(res => res.json())
        .then(data => setRecipe(data))
        }, []);
        
    return (
        <section>
        { Array.isArray(recipe) ? recipe.map(recipe => <RecipeCard key={recipe.id} {...recipe} />) : <p>Nem találtunk recepteket.</p>}
        </section>
  )
}

export default RecipeList
