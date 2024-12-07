import { getCSRFToken } from "./csrf";

// Szerkesztés
export const handleEdit = (recipeId) => {
    console.log('Edit recipe with id:', recipeId);
    
};

// Törlés
export const handleDelete = (recipeId, setRecipe) => {
    console.log("setRecipe:", setRecipe);  
    fetch(`/cookbook/recipes/${recipeId}/`, {
        method: 'DELETE',
        headers: {
            'X-CSRFToken': getCSRFToken(),
        },
    })
    .then(() => {
        if (typeof setRecipe === 'function') {
            setRecipe((prevRecipes) => prevRecipes.filter((recipe) => recipe.id !== recipeId));
            alert("A recept sikeresen törölve!");
        } else {
            console.error("setRecipe nem funkció!");
        }
    })
    .catch(error => console.error("Hiba történt a törlés során:", error));
};

