import { useState } from "react";
import "./App.css";
import { Menu } from "./Menu";
import { FeatureView } from "./FeatureView";
import { SelectedDrink } from "./SelectedDrink";
import "./index.css";

export function ingredientList(drink) {
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
  const [currentView, setCurrentView] = useState("");
  const [menuButton, setMenuButton] = useState("");

  const [byoIngredients, setByoIngredients] = useState([]);

  return (
    <>
      <div className="app-container">
        <div className="app">
          {/* <Logo
          setAlcohol={setAlcohol}
          setCurrentView={setCurrentView}
          setSelectedDrink={setSelectedDrink}
          setMenuButton={setMenuButton}
        /> */}
          {/* //pass props to Form */}
          <Menu
            currentView={currentView}
            setCurrentView={setCurrentView}
            setSelectedDrink={setSelectedDrink}
            setAlcohol={setAlcohol}
            setMenuButton={setMenuButton}
            menuButton={menuButton}
          />
          <FeatureView
            currentView={currentView}
            alcohol={alcohol}
            setAlcohol={setAlcohol}
            setSelectedDrink={setSelectedDrink}
          />
          <SelectedDrink selectedDrink={selectedDrink} />
        </div>
        <Footer />
      </div>
    </>
  );
}

function Footer() {
  return (
    <div className="footer">
      <p>Copyright Dave 2025</p>
    </div>
  );
}
