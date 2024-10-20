import React, { useEffect, useState } from 'react';
import LogoutButton from './LogoutButton';
import RecipeForm from './RecipeForm';
import RecipeList from './RecipeList';
import SearchBar from './SearchBar';
import RecipeCard from './RecipeCard';


function NavBar() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loginUrl, setLoginUrl] = useState('');
    const [logoutUrl, setLogoutUrl] = useState('');
    const [registerUrl, setRegisterUrl] = useState('');
    const [searchResults, setSearchResults] = useState([]);  // A keresési eredmények állapota

    
    // kiválasztott menüpontok kezelése
    const [activeComponent, setActiveComponent] = useState('home'); 
    const handleMenuClick = (componentName) => {
      setActiveComponent(componentName);  // aktív menüpont beállítása
  };

    // Lekérdezzük az URL-eket és az autentikációs státuszt
    useEffect(() => {
        fetch("/auth-urls/")
            .then(response => response.json())
            .then(data => {
                setLoginUrl(data.login_url);
                setLogoutUrl(data.logout_url);
                setRegisterUrl(data.register_url);
            });

        fetch("/user-status/")
            .then(response => response.json())
            .then(data => {
                setIsAuthenticated(data.is_authenticated);
            });
    }, []);

    return (
      <div>

        <nav>
            <a href="#" onClick={() => handleMenuClick('home')}>Főoldal </a>
            <a href="#" onClick={() => handleMenuClick('list')}>Receptek  </a> 
            <SearchBar onSearchResults={(results) => {
                    setSearchResults(results);
                    setActiveComponent('search-results');
                }} />
 
            {isAuthenticated ? (
              <>
                <a href="#" onClick={() => handleMenuClick('new-recipe')}>Új recept </a>
                <LogoutButton/>
                </>
            ) : (
              <>
                    <a href={loginUrl}>Belépés  </a>
                    <a href={registerUrl}>Regisztráció  </a>
                </>
            )}
            <a href="/admin">Admin  </a>
        </nav>

        <div>
          {activeComponent === 'home' && <h1>Üdvözöljük a Főoldalon!</h1>}
          {activeComponent === 'list' && <RecipeList />}  {/* A receptek listázása */}
          {activeComponent === 'new-recipe' && <RecipeForm />}  {/* Új recept űrlap */}
          {activeComponent === 'search-results' && (
  <div>
    <h2>Keresési eredmények:</h2>
    {searchResults.length > 0 ? searchResults.map(recipe => <RecipeCard key={recipe.id} {...recipe} />) : <p>Nem találtunk recepteket.</p>}
  </div>
)}
            </div>
      </div>
    );
}

export default NavBar;
