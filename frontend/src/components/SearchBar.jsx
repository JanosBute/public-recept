import React, { useState, useEffect } from 'react';

function SearchBar({ onSearchResults }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [allRecipes, setAllRecipes] = useState([]); // Az összes recept helyi tárolása

    // Összes recept lekérése egyszer a komponens betöltésekor
    useEffect(() => {
        fetch("/cookbook/recipes/")
            .then(response => response.json())
            .then(data => setAllRecipes(data)) // Az összes recept eltárolása
            .catch(error => console.error('Hiba a receptek lekérdezése során:', error));
    }, []);

    // Szűrés a letöltött adatok között a searchTerm alapján
    useEffect(() => {
        if (searchTerm === '') {
            onSearchResults([]); // Ha a keresőmező üres, töröljük a találatokat
            return;
        }

        // Keresés allRecipes változóban
        const filteredResults = allRecipes.filter(recipe =>
            recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
        );

        onSearchResults(filteredResults); // Szűrt találatok átadása
    }, [searchTerm, allRecipes, onSearchResults]); // Újra fut, ha változik a searchTerm vagy az allRecipes

    return (
        <div style={{ display: 'inline-block', marginLeft: '20px' }}>
            <input 
                type="text" 
                placeholder="Keresés..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)}  // Keresési kifejezés mentése
            />
        </div>
    );
}

export default SearchBar;
