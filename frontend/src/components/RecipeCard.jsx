import React from "react";

const RecipeCard = (props) => {
  const { id, image, name, ingredients, description, preparation, author, currentUser, onEdit, onDelete, onImageClick  } = props;

  console.log("onDelete függvény a RecipeCard-ban:", onDelete);
  const isAuthor = author === currentUser;

  console.log("Current user:", currentUser);
  console.log("Author:", author);
  console.log("isAuthor:", isAuthor);


  return (
    <div style={{ border: '1px solid #ddd', padding: '16px', margin: '10px', borderRadius: '8px' }}>
      <img src={image} alt="kép" onClick={onImageClick} style={{ width: '30%', borderRadius: '8px' }} />
      
      <h2>{name}</h2>
      
      <h3>Összetevők:</h3>
      <ul>
        {ingredients && ingredients.map((ingredient) => (
          <li key={ingredient.id}>{ingredient.name}</li>
        ))}
      </ul>
      
      <h3>Leírás:</h3>
      <p>{description}</p>
      
      <h3>Elkészítése:</h3>
      <div>{preparation}</div>

      {isAuthor && (
        <div style={{ marginTop: '10px' }}>
          <button onClick={() => onEdit(id)} style={{ marginRight: '10px' }}>
            Szerkesztés
          </button>
          <button onClick={() => onDelete && onDelete(id)}> {/* Ellenőrizd, hogy onDelete nem undefined */}
            Törlés
          </button>
        </div>
      )}
    </div>
  );
};

export default RecipeCard;
