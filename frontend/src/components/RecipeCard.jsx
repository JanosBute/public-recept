import React from 'react'

function gen(params) {
    return (
        <ul>
            <li>{params.quantity} {params.unit.unit_name} - {params.ingredient.ing_name}</li>
        </ul>
    )
}

const RecipeCard = (props) => {
  return (
    <div>
        <img src="{props.image}" alt="kép" />
        <h2> {props.name} </h2>
        <p> {props.ingredients.map(gen)} </p>
        <p> {props.description} </p>
    </div>
  )
}

export default RecipeCard