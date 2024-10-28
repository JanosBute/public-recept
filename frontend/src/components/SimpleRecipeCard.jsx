import React, { useState } from 'react';
import RecipeCard from './RecipeCard';

const SimpleRecipeCard = (props) => {
  const [showDetails, setShowDetails] = useState(false); //Állapot: részletes vagy egyszerű kártya

  const handleShowDetails = () => {
    setShowDetails(true);  // Részletes
  };

  const handleHideDetails = () => {
    setShowDetails(false);  // Egyzerű
  };

  return (
    <div>
      {showDetails ? (  // Feltételes renderelés
        <div>
          <RecipeCard
            image={props.image}
            name={props.name}
            description={props.description}
            ingredients={props.ingredients}
            preparation={props.preparation}
          />
          <button onClick={handleHideDetails}>Vissza</button>
        </div>
      ) : (
        <div>
          <img src={props.image} alt="kép" />
          <h2>{props.name}</h2>
          <h3>Leírás:</h3>
          <p>{props.description}</p>
          <button onClick={handleShowDetails}>Részletek</button>
        </div>
      )}
    </div>
  );
};

export default SimpleRecipeCard;
