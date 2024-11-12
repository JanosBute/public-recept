import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';  // Importáljuk a CSS-t

const SearchBar = ({ onSearchResults }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    fetch(`/search?query=${query}`)
      .then(response => response.json())
      .then(data => {
        onSearchResults(data);
        navigate("/search-results"); // Átnavigálás a keresési eredmények oldalra
      });
  };

  return (
    <div>
      <input 
        type="text" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        placeholder="Keresés..." 
      />
      <button onClick={handleSearch}>Keresés</button>
    </div>
  );
};

export default SearchBar;
