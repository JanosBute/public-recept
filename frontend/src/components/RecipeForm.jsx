import React, { useState, useEffect } from "react";
import { getCSRFToken } from '../utils/csrf';

const RecipeForm = () => {
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

  // Meglévő összetevők lekérése
  useEffect(() => {
    fetch("/cookbook/ingredients/")
      .then((response) => response.json())
      .then((data) => setAllIngredients(data))
      .catch((error) => console.error("Hiba az összetevők lekérdezésében:", error));
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

  // Hozzávaló hozzáadása a kiválasztott összetevők listájához
const handleAddIngredient = () => {
  if (!ingredientName.trim()) {
    alert("Az összetevő neve nem lehet üres!");
    return; // Kilépünk a függvényből, ha üres a mező
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
    // Hozzávaló nem található, ezért létrehozunk egy újat
    const newIngredient = { name: ingredientName };

    // Új összetevő létrehozásához
    fetch("/cookbook/ingredients/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'X-CSRFToken': getCSRFToken() // CSRF token beépítése
      },
      body: JSON.stringify(newIngredient),
    })
      .then((response) => response.json())
      .then((data) => {
        setSelectedIngredients((prevState) => [...prevState, data]);
        setAllIngredients((prevState) => [...prevState, data]); // Hozzáadás az "allIngredients" listához is
      })
      .catch((error) => console.error("Hiba az új összetevő létrehozásában:", error));
  }

  setIngredientName(""); // A beviteli mező törlése
};

const handleSubmit = (event) => {
  event.preventDefault();

  // Létrehoz egy űrlap adatobjektumot a fájlfeltöltés kezeléséhez
  const formData = new FormData();
  formData.append("name", recipeData.name);
  formData.append("description", recipeData.description);
  formData.append("preparation", recipeData.preparation);
  if (recipeData.image) {
    formData.append("image", recipeData.image);
  }

  // Minden egyes összetevő azonosítóját külön-külön csatolja a FormData objektumhoz.
  selectedIngredients.forEach((ingredient) => {
    formData.append("ingredients", ingredient.id);
  });

  fetch("/cookbook/recipes/", {
    method: "POST",
    headers: {
      'X-CSRFToken': getCSRFToken() // Itt küldjük el a CSRF tokent
    },
    body: formData,
  })
    .then((response) => {
      // Ellenőrizd, hogy a válasz JSON formátumú-e
      const contentType = response.headers.get("content-type");
      if (!response.ok) {
        if (contentType && contentType.includes("application/json")) {
          return response.json().then((errorData) => {
            throw new Error(JSON.stringify(errorData));
          });
        } else {
          return response.text().then((errorText) => {
            throw new Error(errorText); // Ha nem JSON, adja vissza szövegként
          });
        }
      }
      return response.json();
    })
    .then((data) => {
      console.log("A recept sikeresen elkészült:", data);
      // Az űrlap visszaállítása a sikeres elküldés után
      setRecipeData({
        name: "",
        description: "",
        ingredients: [],
        preparation: "",
        image: null,
      });
      setSelectedIngredients([]); // A kiválasztott összetevők visszaállítása
    })
    .catch((error) => {
      console.error("Hiba a recept létrehozásában:", error.message);
    });
};

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Recept neve:</label>
        <br />
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
        <br />
        <textarea
          name="description"
          value={recipeData.description}
          onChange={handleInputChange}
          required
        />
      </div>

      <div>
        <label>Elkészítési utasítások:</label>
        <br />
        <textarea
          name="preparation"
          value={recipeData.preparation}
          onChange={handleInputChange}
          required
        />
      </div>

      <div>
        <label>Kép:</label>
        <br />
        <input type="file" onChange={handleImageChange} />
      </div>

      <div>
        <label>Hozzávalók:</label>
        <br />
        <input
          type="text"
          value={ingredientName}
          onChange={(e) => setIngredientName(e.target.value)}
          placeholder="Hozzávaló neve"
        />
        <button type="button" onClick={handleAddIngredient}>
        Hozzávaló hozzáadása
        </button>
        
        {/* Hozzáadott összetevők megjelenítése */}
        <ul>
          {selectedIngredients.map((ingredient) => (
            <li key={ingredient.id}>
              {ingredient.name}
              {/* Az összetevő eltávolításának lehetősége */}
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

      <button type="submit">Recept létrehozása</button>
    </form>
  );
};

export default RecipeForm;
