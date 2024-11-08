import React from "react";
import { useNavigate } from "react-router-dom";

const RecipeCard = (props) => {
  const { id, image, name, ingredients, description, preparation, author, currentUser, onDelete, onImageClick } = props;
  const navigate = useNavigate();

  const isAuthor = author === currentUser;

  // Szerkesztési útvonalra navigálás
  const handleEdit = () => {
    navigate(`/recipes/edit/${id}`);
  };

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
          <button onClick={handleEdit} style={{ marginRight: '10px' }}>
            Szerkesztés
          </button>
          <button onClick={() => onDelete && onDelete(id)}>
            Törlés
          </button>
        </div>
      )}
    </div>
  );
};

export default RecipeCard;
