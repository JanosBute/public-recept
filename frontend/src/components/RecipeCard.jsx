import React from "react";
import { useNavigate } from "react-router-dom";
import './RecipeCard.css';  // Importáljuk a CSS-t

const RecipeCard = (props) => {
  const { id, image, name, ingredients, preparation, author, currentUser, onDelete, onImageClick } = props;
  const navigate = useNavigate();

  const isAuthor = author === currentUser;

  // Szerkesztési útvonalra navigálás
  const handleEdit = () => {
    navigate(`/recipes/edit/${id}`);
  };

  return (
    <div className="recipe-card">
      <img src={image} alt="kép" onClick={onImageClick} />
      
      <h2>{name}</h2>
      
      <h3>Összetevők:</h3>
      <ul>
        {ingredients && ingredients.map((ingredient) => (
          <li key={ingredient.id}>{ingredient.name}</li>
        ))}
      </ul>
      
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
