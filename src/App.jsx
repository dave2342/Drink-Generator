import { useState, useEffect } from "react";
import {
  fetchAllDrinks,
  fetchDrinkDetailsById,
  fetchGinDrinks,
  fetchRumDrinks,
  fetchTequilaDrinks,
  fetchVodkaDrinks,
  fetchWhiskeyDrinks,
} from "./api/alcoholDrinks";
import "./App.css";

function ingredientList(drink) {
  const ingredients = [];
  for (let i = 1; i <= 15; i++) {
    const ingredient = drink[`strIngredient${i}`];
    const measurement = drink[`strMeasure${i}`];

    if (ingredient) {
      ingredients.push(`${measurement || ""} ${ingredient}`.trim());
    }
  }
  return ingredients;
}

export default function App() {
  const [alcohol, setAlcohol] = useState("");
  const [selectedDrink, setSelectedDrink] = useState(null);

  return (
    <>
      <div className="app">
        <Logo />
        {/* //pass props to Form */}
        <Form
          alcohol={alcohol}
          setAlcohol={setAlcohol}
          selectedDrink={selectedDrink}
          setSelectedDrink={setSelectedDrink}
        />
        <SelectedDrink selectedDrink={selectedDrink} />
        <Footer />
      </div>
    </>
  );
}

function Logo() {
  return <h1>🥃Drink Generator🍹</h1>;
}

function Form({ alcohol, setAlcohol, setSelectedDrink }) {
  async function handleSubmit(e) {
    e.preventDefault();

    if (!alcohol) return;

    let drinks;

    switch (alcohol) {
      case "all":
        drinks = await fetchAllDrinks();
        break;
      case "gin":
        drinks = await fetchGinDrinks();
        break;
      case "rum":
        drinks = await fetchRumDrinks();
        break;
      case "tequila":
        drinks = await fetchTequilaDrinks();
        break;
      case "vodka":
        drinks = await fetchVodkaDrinks();
        break;
      case "whiskey":
        drinks = await fetchWhiskeyDrinks();
        break;
      default:
        console.warn(`Unhandled lcohol type: ${alcohol}`);
        drinks = [];
    }

    if (drinks.length > 0) {
      const randomDrink = drinks[Math.floor(Math.random() * drinks.length)];
      const detailedDrink = await fetchDrinkDetailsById(randomDrink.idDrink);
      setSelectedDrink(detailedDrink);
    }
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <select id="alcohol" onChange={(e) => setAlcohol(e.target.value)}>
        <option value="">Select</option>
        <option value="all">All</option>
        <option value="gin">Gin</option>
        <option value="rum">Rum</option>
        <option value="tequila">Tequila</option>
        <option value="vodka">Vodka</option>
        <option value="whiskey">Whiskey</option>
      </select>
      <button>Make drink</button>
    </form>
  );
}

function SelectedDrink({ selectedDrink }) {
  if (!selectedDrink) return null;

  const ingredients = ingredientList(selectedDrink);

  return (
    <div className="result">
      <div className="drink-info">
        <div className="drink-text">
          <h3>{selectedDrink.strDrink}</h3>
          <ul>
            {ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <img
          src={selectedDrink.strDrinkThumb}
          alt={selectedDrink.strDrink}
          className="drink-img"
        />
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="footer">
      <p>Copyright Dave 2025</p>
    </div>
  );
}
