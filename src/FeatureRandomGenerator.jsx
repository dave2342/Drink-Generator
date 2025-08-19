import {
  fetchAllDrinks,
  fetchGinDrinks,
  fetchRumDrinks,
  fetchTequilaDrinks,
  fetchVodkaDrinks,
  fetchWhiskeyDrinks,
  fetchDrinkDetailsById,
} from "./api/alcoholDrinks";

export function RandomGenerator({ alcohol, setAlcohol, setSelectedDrink }) {
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
        console.warn(`Unhandled Alcohol type: ${alcohol}`);
        drinks = [];
    }

    if (drinks.length > 0) {
      const randomDrink = drinks[Math.floor(Math.random() * drinks.length)];
      const detailedDrink = await fetchDrinkDetailsById(randomDrink.idDrink);
      setSelectedDrink(detailedDrink);
    }
  }

  return (
    <>
      <div className="alcohol-select">
        {/* <input
          type="text"
          className="ingredient-search"
          placeholder="Enter Ingredient"
        /> */}
        <form className="add-form" onSubmit={handleSubmit}>
          <select
            className="rounded-none"
            id="alcohol"
            onChange={(e) => setAlcohol(e.target.value)}
          >
            <option value="">Select</option>
            <option value="all">Random</option>
            <option value="gin">Gin</option>
            <option value="rum">Rum</option>
            <option value="tequila">Tequila</option>
            <option value="vodka">Vodka</option>
            <option value="whiskey">Whiskey</option>
          </select>
          <button className="make-drink-button">Make drink</button>
        </form>
      </div>
    </>
  );
}
