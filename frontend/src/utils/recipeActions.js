import { getCSRFToken } from "./csrf";

// Szerkesztés
export const handleEdit = (recipeId) => {
    console.log('Edit recipe with id:', recipeId);
    // Itt megvalósíthatod a szerkesztési logikát, pl. navigáció egy szerkesztő oldalra
};

// Törlés
export const handleDelete = (recipeId, setRecipe) => {
    console.log("setRecipe:", setRecipe);  // Debugging purpose
    fetch(`/cookbook/recipes/${recipeId}/`, {
        method: 'DELETE',
        headers: {
            'X-CSRFToken': getCSRFToken(),
        },
    })
    .then(() => {
        if (typeof setRecipe === 'function') {
            setRecipe((prevRecipes) => prevRecipes.filter((recipe) => recipe.id !== recipeId));
        } else {
            console.error("setRecipe is not a function");
        }
    })
    .catch(error => console.error("Hiba történt a törlés során:", error));
};

