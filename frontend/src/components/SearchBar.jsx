import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";

const SearchBar = ({ onSearchResults }) => {
  const [query, setQuery] = useState("");
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    fetch(`cookbook/search-recipes?query=${query}`)
      .then((response) => response.json())
      .then((data) => {
        onSearchResults(data);
        navigate("/search-results"); // Navigálás a keresési eredmények oldalra
        setQuery(""); // Törli a keresési mező tartalmát
        setIsMobileSearchOpen(false); // Mobil kereső bezárása
      });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Ne frissüljön újra az oldal
      handleSearch();
    }
  };

  return (
    <>
      {/* Asztali kereső */}
      <div className="desktop-search-bar">
        <input
          type="text"
          placeholder="Recept vagy összetevő..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      {/* Mobil lebegő kereső */}
      <div className="mobile-search-container">
        {!isMobileSearchOpen && (
          <button
            className="mobile-search-icon"
            onClick={() => setIsMobileSearchOpen(true)}
            aria-label="Open Search"
          >
            🔍
          </button>
        )}

        {isMobileSearchOpen && (
          <div className="mobile-search-bar">
            <input
              type="text"
              placeholder="Recept vagy összetevő..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
            />
            <button
              className="mobile-close-icon"
              onClick={() => setIsMobileSearchOpen(false)}
              aria-label="Close Search"
            >
              ✖
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchBar;
