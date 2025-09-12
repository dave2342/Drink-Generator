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
  const [currentView, setCurrentView] = useState("default");
  const [menuButton, setMenuButton] = useState("");
  const [byoIngredients, setByoIngredients] = useState([]);

  return (
    <>
      <div className="msm:ax-w-md sm:mx-auto sm:p-4">
        <div className="app-container">
          <div className="app">
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
              setCurrentView={setCurrentView}
            />
            <SelectedDrink selectedDrink={selectedDrink} />
          </div>
          <Footer />
        </div>
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
