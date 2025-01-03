import React, { useState, useEffect } from 'react';

const IngredientFilter = ({ onFilterChange }) => {
    const [ingredients, setIngredients] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [selectAll, setSelectAll] = useState(false); // Új állapot: Mindet kiválaszt

    useEffect(() => {
        fetch('/cookbook/ingredients/')
            .then(response => response.json())
            .then(data => setIngredients(data))
            .catch(error => console.error('Hiba az összetevők lekérdezésekor:', error));
    }, []);

    // Checkbox állapot frissítése egyesével
    const handleCheckboxChange = (ingredientId) => {
        setSelectedIngredients((prev) =>
            prev.includes(ingredientId)
                ? prev.filter((id) => id !== ingredientId)
                : [...prev, ingredientId]
        );
    };

    // Mindet kiválasztó checkbox kezelése
    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedIngredients([]); // Minden checkbox kikapcsolása
        } else {
            setSelectedIngredients(ingredients.map((ingredient) => ingredient.id)); // Minden checkbox bekapcsolása
        }
        setSelectAll(!selectAll); // selectAll állapot invertálása
    };

    // Értesítés a RecipeList komponens felé a kiválasztott checkboxokról
    useEffect(() => {
        onFilterChange(selectedIngredients);
    }, [selectedIngredients, onFilterChange]);

    return (
        <div className="ingredient-filter">
            <h3>Szűrés összetevők alapján</h3>
            <div>
                <label>
                    <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAll}
                    />
                    Mindet kiválaszt
                </label>
            </div>
            {ingredients.map((ingredient) => (
                <div key={ingredient.id}>
                    <label>
                        <input
                            type="checkbox"
                            value={ingredient.id}
                            checked={selectedIngredients.includes(ingredient.id)}
                            onChange={() => handleCheckboxChange(ingredient.id)}
                        />
                        {ingredient.name}
                    </label>
                </div>
            ))}
        </div>
    );
};

export default IngredientFilter;
