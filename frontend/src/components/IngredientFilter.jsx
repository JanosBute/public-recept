import React, { useState, useEffect } from 'react';
import "./IngredientFilter.css";

const IngredientFilter = ({ onFilterChange }) => {
    const [ingredients, setIngredients] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [selectAll, setSelectAll] = useState(false); // Új állapot: Mindet kiválaszt

    // Összetevők sorba rendezése
    const sortIngredients = (data) => {
        return data.sort((a, b) => {
            const categoryComparison = a.category.localeCompare(b.category, 'hu');
            if (categoryComparison !== 0) {
                return categoryComparison;
            }
            return a.name.localeCompare(b.name, 'hu');
        });
    };    

    useEffect(() => {
        fetch('/cookbook/ingredients/')
            .then(response => response.json())
            .then(data => setIngredients(sortIngredients(data)))
            .catch(error => console.error('Hiba az összetevők lekérdezésekor: ', error));
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

    let currentCategory = ' ';

    return (
        <div className="ingredient-filter">
            <h3>Szűrés összetevők alapján</h3>
            <div>
                <label className = "select-all">
                    <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAll}
                    />
                    <strong>Mindet kiválaszt</strong>
                </label>
            </div>
            {ingredients.map((ingredient) => {
                const categoryDisplay = ingredient.category !== currentCategory ? (
                    <div key={`category-${ingredient.category}`} style={{ fontWeight: 'bold' }}>
                        {ingredient.category.charAt(0).toUpperCase() + ingredient.category.slice(1)}:
                    </div>
                ) : (<div key={`category-${ingredient.category}`} style={{ color: 'white' }}>_</div>);

                currentCategory = ingredient.category;

                return (
                    <div key={ingredient.id}>
                        {categoryDisplay}
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
                );
            })}
        </div>
    );
};

export default IngredientFilter;