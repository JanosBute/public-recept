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
<<<<<<< HEAD
        <div>
=======
        <div class="card" onClick={handleHideDetails}>
>>>>>>> 9cdef3a8bb777684581f6d38f82cec86b1193cd5
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
<<<<<<< HEAD
        <div>
          <img src={props.image} alt="kép" onClick={handleShowDetails}/>
          <em>Részletekért kattints a képre</em>
=======
        <div class="card" onClick={handleShowDetails}>
          <img src={props.image} alt="kép" />
>>>>>>> 9cdef3a8bb777684581f6d38f82cec86b1193cd5
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
