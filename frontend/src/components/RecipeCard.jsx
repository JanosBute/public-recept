import React from 'react';

const RecipeCard = (props) => {
  return (
    <div>
      <img src={props.image} alt="kép" />
      <h2>{props.name}</h2>      
      {/* Iterálás az összetevőkön */}
      <h3>Összetevők:</h3>
      <ul>
        {props.ingredients && props.ingredients.map((ingredient) => (
          <li key={ingredient.id}>{ingredient.name}</li>
        ))}
      </ul>
      <h3>Leírás:</h3>
      <p>{props.description}</p>
      <h3>Elkészítése:</h3>
      <div>
        {props.preparation}
      </div>
    </div>
  );
};

export default RecipeCard;
