import React, { useState } from 'react';
import RecipeCard from './RecipeCard';
import './SimpleRecipeCard.css';  // Importáljuk a CSS-t
import './RecipeCard.css';

const SimpleRecipeCard = (props) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleShowDetails = () => {
    setShowDetails(true);
  };

  const handleHideDetails = () => {
    setShowDetails(false);
  };

  return (
    <div>
      {showDetails ? (
        <div onClick={handleHideDetails}>
          <RecipeCard
            id={props.id}
            image={props.image}
            name={props.name}
            description={props.description}
            ingredients={props.ingredients}
            preparation={props.preparation}
            author={props.author}
            currentUser={props.currentUser} // Fontos: ez legyen átadva, ha használod
            onEdit={props.onEdit} // Adj át az onEdit propot
            onDelete={props.onDelete} // Adj át az onDelete propot
          />
          <button onClick={handleHideDetails}>Vissza</button>
        </div>
      ) : (
        <div onClick={handleShowDetails} className='simple-recipe-card '>
          <img src={props.image} alt="kép" />
          <h2>{props.name}</h2>
          <p>{props.description}</p>
          <button onClick={handleShowDetails}>Részletek</button>
        </div>
      )}
    </div>
  );
};
export default SimpleRecipeCard;