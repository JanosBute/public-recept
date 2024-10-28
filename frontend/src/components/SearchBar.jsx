import React, { useState, useEffect } from 'react';

function SearchBar({ onSearchResults }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [allRecipes, setAllRecipes] = useState([]);
    
    // Összes recept lekérése
    useEffect(() => {
        fetch("/cookbook/recipes/")
            .then(response => response.json())
            .then(data => setAllRecipes(data))
            .catch(error => console.error('Hiba a receptek lekérdezése során:', error));
    }, []);

    // Keresési eredmények kiszűrése
    const handleSearch = () => {
        if (searchTerm === '') {
            onSearchResults(allRecipes); // Üres kereső esetén az összes receptet mutatjuk
            return;
        }

        const filteredResults = allRecipes.filter(recipe => {
            const nameMatches = recipe.name.toLowerCase().includes(searchTerm.toLowerCase());
            const ingredientMatches = recipe.ingredients.some(ingredient => 
                ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            return nameMatches || ingredientMatches;
        });

        onSearchResults(filteredResults); // Szűrt találatok átadása
    };

    // Keresés indítása az Enter lenyomásával
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Az űrlap ne frissüljön újra
            handleSearch();
        }
    };

    return (
        <div style={{ display: 'inline-block', marginLeft: '20px' }}>
            <input 
                type="text" 
                placeholder="Keresés..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}  // Enter lenyomásra keresés
            />
            <button onClick={handleSearch}>Keresés</button> {/* Gombbal is keresés */}
        </div>
    );
}

export default SearchBar;
