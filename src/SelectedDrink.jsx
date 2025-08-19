import { ingredientList } from "./App";

export function SelectedDrink({ selectedDrink }) {
  if (!selectedDrink) return null;

  const ingredients = ingredientList(selectedDrink);

  return (
    <div className="content-wrapper">
      <div className="result">
        <div className="drink-info">
          <div className="drink-image-container">
            <img
              src={selectedDrink.strDrinkThumb}
              alt={selectedDrink.strDrink}
              className="drink-img"
            />
          </div>
          <div className="drink-text">
            <h3 className="drink-title">{selectedDrink.strDrink}</h3>
            <ul className="ingredients-list">
              {ingredients.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          {/* <img
            src={selectedDrink.strDrinkThumb}
            alt={selectedDrink.strDrink}
            className="drink-img"
          /> */}
        </div>
        <div className="drink-favorite">❤️</div>
      </div>
    </div>
  );
}
