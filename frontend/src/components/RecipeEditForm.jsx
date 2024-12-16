import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCSRFToken } from '../utils/csrf';
import './RecipeEditForm.css';  // Importáljuk a CSS-t


const RecipeEditForm = () => {
    const { id } = useParams();
    const navigate = useNavigate(); // useNavigate hook
    const [recipeData, setRecipeData] = useState({
      name: "",
      description: "",
      ingredients: [],
      preparation: "",
      image: null,
    });

    const [ingredientName, setIngredientName] = useState("");
    const [allIngredients, setAllIngredients] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState([]);

    useEffect(() => {
        fetch(`/cookbook/recipes/${id}/`)
            .then(response => response.json())
            .then(data => {
                setRecipeData({
                    name: data.name,
                    description: data.description,
                    preparation: data.preparation,
                    image: null, // Null értéket állítunk be, hogy ne töltsön fel meglévő képet
                });
                setSelectedIngredients(data.ingredients);
            })
            .catch(error => console.error("Hiba a recept lekérdezésében:", error));
    }, [id]);

    useEffect(() => {
        fetch("/cookbook/ingredients/")
            .then(response => response.json())
            .then(data => setAllIngredients(data))
            .catch(error => console.error("Hiba az összetevők lekérdezésében:", error));
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setRecipeData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleImageChange = (event) => {
        setRecipeData((prevState) => ({
            ...prevState,
            image: event.target.files[0],
        }));
    };

    const handleAddIngredient = () => {
        if (!ingredientName.trim()) {
            alert("Az összetevő neve nem lehet üres!");
            return;
        }

        const ingredient = allIngredients.find(
            (ing) => ing.name.toLowerCase() === ingredientName.toLowerCase()
        );

        if (ingredient) {
            if (!selectedIngredients.some((ing) => ing.id === ingredient.id)) {
                setSelectedIngredients((prevState) => [...prevState, ingredient]);
            } else {
                alert('Ezt az összetevőt már hozzáadtuk!');
            }
        } else {
            const newIngredient = { name: ingredientName };

            fetch("/cookbook/ingredients/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'X-CSRFToken': getCSRFToken(),
                },
                body: JSON.stringify(newIngredient),
            })
                .then((response) => response.json())
                .then((data) => {
                    setSelectedIngredients((prevState) => [...prevState, data]);
                    setAllIngredients((prevState) => [...prevState, data]);
                })
                .catch((error) => console.error("Hiba az új összetevő létrehozásában:", error));
        }

        setIngredientName("");
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("name", recipeData.name);
        formData.append("description", recipeData.description);
        formData.append("preparation", recipeData.preparation);
        if (recipeData.image) {
            formData.append("image", recipeData.image);
        }

        const ingredients = selectedIngredients.map(ing => ing.id);
        ingredients.forEach(id => formData.append("ingredients", id));

        // FormData elemei
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }

        fetch(`/cookbook/recipes/${id}/`, {
            method: "PUT",
            headers: {
                'X-CSRFToken': getCSRFToken(),
            },
            body: formData,
        })
        .then((response) => {
            if (!response.ok) {
                return response.json().then((errorData) => {
                    throw new Error(JSON.stringify(errorData));
                });
            }
            return response.json();
        })
        .then((data) => {
            console.log("Recept sikeresen frissítve.", data);
            alert("Recept sikeresen frissítve")
            navigate(`/my-recipes`);
        })
        .catch((error) => {
            console.error("Hiba a recept frissítése során:", error.message);
            alert("Hiba a recept frissítése során:")
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Recept szerkesztése</h2>
            <div>
                <label>Recept neve:</label>
                <input
                    type="text"
                    name="name"
                    value={recipeData.name}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div>
                <label>Leírás:</label>
                <textarea
                    name="description"
                    value={recipeData.description}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div>
                <label>Elkészítési utasítások:</label>
                <textarea
                    name="preparation"
                    value={recipeData.preparation}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div>
                <label>Kép:</label>
                <input type="file" onChange={handleImageChange} />
            </div>
            <div>
                <label>Hozzávalók:</label>

                <input
                    type="text"
                    value={ingredientName}
                    onChange={(e) => setIngredientName(e.target.value)}
                    placeholder="Hozzávaló neve"
                />
                <button type="button" onClick={handleAddIngredient}>
                    Hozzávaló hozzáadása
                </button>
                <ul>
                    {selectedIngredients.map((ingredient) => (
                        <li key={ingredient.id}>
                            {ingredient.name}
                            <button
                                type="button"
                                onClick={() =>
                                    setSelectedIngredients((prev) =>
                                        prev.filter((ing) => ing.id !== ingredient.id)
                                    )
                                }
                            >
                                Eltávolítás
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <button type="submit">Recept frissítése</button>
        </form>
    );
};

export default RecipeEditForm;
