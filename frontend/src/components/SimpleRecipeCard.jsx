import React, { useState } from 'react';
import RecipeCard from './RecipeCard';

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
        <div>
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
            onImageClick={handleHideDetails} // Új prop hozzáadása
          />
          <button onClick={handleHideDetails}>Vissza</button>
        </div>
      ) : (
        <div>
          <img src={props.image} alt="kép" onClick={handleShowDetails}/>
          <em>Részletekért kattints a képre</em>
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
