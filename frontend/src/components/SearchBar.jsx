import React, { useState } from 'react';

function SearchBar({ onSearchResults }) {  // 'onSearchResults' prop, hogy átadjuk a találatokat
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchSubmit = (e) => {
        e.preventDefault();

        // Keresés API hívással
        fetch(`/cookbook/search-recipes?query=${searchTerm}`)
            .then(response => response.json())
            .then(data => {
                onSearchResults(data);  // Keresési eredményeket átadjuk
            })
            .catch(error => console.error('Hiba a keresés során:', error));
    };

    return (
        <form onSubmit={handleSearchSubmit} style={{ display: 'inline-block', marginLeft: '20px' }}>
            <input 
                type="text" 
                placeholder="Keresés..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)}  // Keresési kifejezés mentése
            />
            <button type="submit">Keresés</button>
        </form>
    );
}

export default SearchBar;
