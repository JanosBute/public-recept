import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./SearchBar.css";

const SearchBar = ({ onSearchResults }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    fetch(`cookbook/search-recipes?query=${query}`)
      .then(response => response.json())
      .then(data => {
        onSearchResults(data);
        navigate("/search-results"); // Átnavigálás a keresési eredmények oldalra
      });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
        e.preventDefault(); // Az űrlap ne frissüljön újra
        handleSearch();
    }
};

  return (
    <div>
      <input 
        type="text" 
        placeholder="Recept vagy összetevő..." 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        onKeyDown={handleKeyDown}  // Enter lenyomásra keresés
      />
      <button onClick={handleSearch}>Keresés</button>
    </div>
  );
};

export default SearchBar;