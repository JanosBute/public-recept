import React, { useState } from 'react';
import RecipeCard from './RecipeCard';
import Modal from './Modal';
import './SimpleRecipeCard.css';

const SimpleRecipeCard = (props) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleShowDetails = () => setShowDetails(true);
  const handleHideDetails = () => setShowDetails(false);

  return (
    <div>
      <div onClick={handleShowDetails} className='simple-recipe-card'>
        <img src={props.image} alt="kép" />
        <h2>{props.name}</h2>
        <p>{"("+props.category+")"}</p>
        <p>{props.description}</p>
        <button onClick={handleShowDetails}>Részletek</button>
      </div>

      {/* Modal megjelenítése a RecipeCard-dal */}
      <Modal isOpen={showDetails} onClose={handleHideDetails}>
        <RecipeCard
          id={props.id}
          image={props.image}
          name={props.name}
          category={props.category}
          description={props.description}
          ingredients={props.ingredients}
          preparation={props.preparation}
          author={props.author}
          currentUser={props.currentUser}
          onEdit={props.onEdit}
          onDelete={props.onDelete}
        />
      </Modal>
    </div>
  );
};

export default SimpleRecipeCard;