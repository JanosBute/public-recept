import React, { useState } from 'react';
import RecipeCard from './RecipeCard'; // Importáljuk a részletes kártyát

const SimpleRecipeCard = (props) => {
  // Állapot, amely jelzi, hogy a részletes kártyát mutatjuk-e
  const [showDetails, setShowDetails] = useState(false);

  const handleShowDetails = () => {
    setShowDetails(true);  // Részletek megjelenítése
  };

  const handleHideDetails = () => {
    setShowDetails(false);  // Visszatérés az egyszerű nézethez
  };

  return (
    <div>
      {/* Feltételes renderelés: ha a showDetails igaz, a részletes kártyát mutatjuk */}
      {showDetails ? (
        <div>
          <RecipeCard
            image={props.image}
            name={props.name}
            description={props.description}
            ingredients={props.ingredients}
            preparation={props.preparation}
          />
          <button onClick={handleHideDetails}>Vissza</button> {/* Vissza gomb */}
        </div>
      ) : (
        <div>
          <img src={props.image} alt="kép" />
          <h2>{props.name}</h2>
          <h3>Leírás:</h3>
          <p>{props.description}</p>
          <button onClick={handleShowDetails}>Részletek</button> {/* Részletek gomb */}
        </div>
      )}
    </div>
  );
};

export default SimpleRecipeCard;
