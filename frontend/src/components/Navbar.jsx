import React, { useEffect, useState } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import LogoutButton from "./LogoutButton";
import RecipeForm from "./RecipeForm";
import RecipeList from "./RecipeList";
import SearchBar from "./SearchBar";
import SimpleRecipeCard from "./RecipeCard";
import MyRecipes from "./MyRecipes";
import RecipeEditForm from "./RecipeEditForm";
import MainPage from "./MainPage.jsx";
import "./NavBar.css";
import Footer from "./Footer.jsx";

function NavBar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginUrl, setLoginUrl] = useState("");
  const [logoutUrl, setLogoutUrl] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    fetch("/auth-urls/")
      .then((response) => response.json())
      .then((data) => {
        setLoginUrl(data.login_url);
        setLogoutUrl(data.logout_url);
      });

    fetch("/user-status/")
      .then((response) => response.json())
      .then((data) => {
        setIsAuthenticated(data.is_authenticated);
      });
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <Router>
        <div>
          <nav className="navbar">
            <input
              type="checkbox"
              id="menu-toggle"
              className="menu-toggle"
              checked={menuOpen}
              onChange={toggleMenu}
            />
            <label htmlFor="menu-toggle" className="hamburger">
              <span></span>
              <span></span>
              <span></span>
            </label>

            <div className="logo-container">
              <img src="/media/logo.jpg" alt="Logo" className="logo" />
              <h1 className="site-title">Receptkönyv</h1>
            </div>

            <SearchBar
              onSearchResults={(results) => setSearchResults(results)}
            />

            <div className={`menu ${menuOpen ? "open" : ""}`}>
              <Link to="/" onClick={closeMenu}>
                Főoldal
              </Link>
              <Link to="/recipes" onClick={closeMenu}>
                Receptek
              </Link>
              {isAuthenticated ? (
                <>
                  <Link to="/my-recipes" onClick={closeMenu}>
                    Saját receptek
                  </Link>
                  <Link to="/new-recipe" onClick={closeMenu}>
                    Új recept
                  </Link>
                  <LogoutButton />
                </>
              ) : (
                <a href={loginUrl} onClick={closeMenu}>
                  Belépés
                </a>
              )}
              <a href="/admin" onClick={closeMenu}>
                Admin
              </a>
            </div>
          </nav>

          <div
            className={`overlay ${menuOpen ? "visible" : ""}`}
            onClick={closeMenu}
          ></div>

          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/recipes" element={<RecipeList />} />
            <Route
              path="/new-recipe"
              element={isAuthenticated ? <RecipeForm /> : <Navigate to="/" />}
            />
            <Route
              path="/my-recipes"
              element={isAuthenticated ? <MyRecipes /> : <Navigate to="/" />}
            />
            <Route
              path="/recipes/edit/:id"
              element={
                <RecipeEditForm
                  onUpdateSuccess={() => {
                    /* Navigáció */
                  }}
                />
              }
            />
            <Route
              path="/search-results"
              element={
                <div>
                  <h2>Keresési eredmények:</h2>
                  {searchResults.length > 0 ? (
                    searchResults.map((recipe) => (
                      <SimpleRecipeCard key={recipe.id} {...recipe} />
                    ))
                  ) : (
                    <p>Nem találtunk recepteket.</p>
                  )}
                </div>
              }
            />
          </Routes>
        </div>
      </Router>
      <Footer />
    </>
  );
}

export default NavBar;
