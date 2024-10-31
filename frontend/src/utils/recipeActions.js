import { getCSRFToken } from "./csrf";

// Szerkesztés
export const handleEdit = (recipeId) => {
    console.log('Edit recipe with id:', recipeId);
    // Itt megvalósíthatod a szerkesztési logikát, pl. navigáció egy szerkesztő oldalra
};

// Törlés
export const handleDelete = (recipeId, setRecipe) => {
    fetch(`/cookbook/recipes/${recipeId}/`, {
        method: 'DELETE',
        headers: {
            'X-CSRFToken': getCSRFToken(),
        },
    })
    .then(() => {
        setRecipe(prevRecipes => prevRecipes.filter(recipe => recipe.id !== recipeId));
    })
    .catch(error => console.error("Hiba történt a törlés során:", error));
};
