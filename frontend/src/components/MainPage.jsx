import React, { useState, useEffect } from "react";
import "./MainPage.css";

const MainPage = () => {
  const [currentUser, setCurrentUser] = useState(null);

  // Bejelentkezett felhasználó lekérdezése
  useEffect(() => {
    fetch("/users/api/")
      .then((response) => response.json())
      .then((data) => setCurrentUser(data.username))
      .catch((error) =>
        console.error("Hiba a felhasználói adatok lekérdezésekor:", error)
      );
  }, []);

  // Feltételes JSX visszaadása
  return (
    <div>
      {currentUser ? (
        <h1>Üdvözöljük a főoldalon, {currentUser}!</h1>
      ) : (
        <h1>Üdvözöljük a főoldalon!</h1>
      )}
    </div>
  );
};

export default MainPage;
