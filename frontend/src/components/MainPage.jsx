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

  return (
    <div className="main-page">
      {/* Feltételes üdvözlés, ha a felhasználó be van jelentkezve */}
      <div className="welcome-message">
        {currentUser ? (
          <h1>Üdvözöljük a főoldalon, {currentUser}!</h1>
        ) : (
          <h1>Üdvözöljük a főoldalon!</h1>
        )}
      </div>

      <header>
        <h1>Üdvözlünk a Receptkönyv-ben, a főzés új világában!</h1>
      </header>

      <section className="section-main intro" >
        <p>
          Örömmel köszöntünk téged weboldalunkon, ahol minden recept egy új
          lehetőséget kínál a konyhában. Legyen szó egy gyors hétköznapi étkezésről
          vagy egy különleges ünnepi fogásról, itt mindent megtalálsz, amire szükséged
          lehet. Böngéssz, inspirálódj, és oszd meg saját receptjeidet is a
          közösséggel!
        </p>
      </section>

      <section className="section-main features">
        <h2>Miért válaszd a Receptkönyvet?</h2>
        <ul>
          <li>
            <h3>Receptek könnyedén, bejelentkezés nélkül</h3>
            <p>
              Böngéssz a receptjeink között anélkül, hogy be kellene jelentkezned! Mindig
              találsz egy új ételt, amit kipróbálhatsz – gyors vacsorák, ínycsiklandó desszertek
              és sok más kategóriában.
            </p>
          </li>
          <li>
            <h3>Saját receptfeltöltés és módosítás</h3>
            <p>
              Ha regisztrálsz és bejelentkezel, lehetőséged van saját receptjeid feltöltésére,
              valamint azok módosítására és törlésére is. Ezzel egyéni receptgyűjteményt
              építhetsz, amelyet bármikor frissíthetsz vagy változtathatsz!
            </p>
          </li>
          <li>
            <h3>Képes receptek és részletes leírások</h3>
            <p>
              Minden recepthez egy szép kép és részletes elkészítési útmutató tartozik, így
              biztos lehetsz benne, hogy a főzés minden lépése világos és egyszerű lesz.
            </p>
          </li>
          <li>
            <h3>Recept kereső – gyors és egyszerű</h3>
            <p>
              A kereső segítségével könnyedén rátalálhatsz egy-egy konkrét ételre vagy
              hozzávalóra. Ha tudod, mit szeretnél főzni, használd a keresőt a megfelelő
              recept megtalálásához.
            </p>
          </li>
        </ul>
      </section>

      <section className="section-main additional">
        <h2>Ami még rád vár:</h2>
        <ul>
          <li>
            <h3>Közösségi élmény</h3>
            <p>
              Csatlakozz a közösséghez, oszd meg saját receptjeidet, és fedezd fel, hogyan készítik
              el mások a kedvenc ételeiket. Képzeld el, milyen jó érzés, 
              ha mások is kipróbálják a receptjeidet!
            </p>
          </li>
        </ul>
      </section>
      
      <section className="section-main cta">
        <h2>Regisztrálj, és hozd létre saját receptgyűjteményed!</h2>
        <p>
          Csatlakozz a közösséghez, regisztrálj, és élvezd az összes prémium funkciót: tölts
          fel, módosíts és törölj receptet, valamint építsd fel a saját recepttáradat! Ne
          hagyd ki a lehetőséget, hogy egyedi étkezéseket készíts és oszd meg őket a
          világgal!
        </p>
      </section>

      <footer>
        <p>
          &copy; 2024 Receptkönyv - Minden jog fenntartva.
        </p>
      </footer>
    </div>
  );
};

export default MainPage;
