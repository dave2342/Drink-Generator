// Fetch function for each alcohol
export const fetchDrinksByAlcohol = async (alcoholTypes) => {
  const types = Array.isArray(alcoholTypes) ? alcoholTypes : [alcoholTypes];
  // const allDrinks = [];

  //for (const type of types) {
  //const apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${type}`;
  //map all alcohols and fetch each one first
  const drinkPromises = types.map(async (type) => {
    const apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${type}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      return data.drinks || [];
      //if (data.drinks) {
      // allDrinks.push(...data.drinks);
    } catch (error) {
      console.error(`Error fetching ${type} drinks:`, error);
      return [];
    }
    // return allDrinks;
  });
  //promise tells js to wait until all fetches finish
  const results = await Promise.all(drinkPromises);
  const allDrinks = results.flat(); // flatten the array of arrays into one array
  return allDrinks;
};

//to retrieve ingredients
export async function fetchDrinkDetailsById(id) {
  const response = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  const data = await response.json();
  return data.drinks ? data.drinks[0] : null;
}

// define specific functions for each alcohol type
export const fetchGinDrinks = () => fetchDrinksByAlcohol("Gin");
export const fetchRumDrinks = () => fetchDrinksByAlcohol("Rum");
export const fetchTequilaDrinks = () => fetchDrinksByAlcohol("Tequila");
export const fetchVodkaDrinks = () => fetchDrinksByAlcohol("Vodka");
export const fetchWhiskeyDrinks = () =>
  fetchDrinksByAlcohol([
    "Whiskey",
    "Whisky",
    "Bourbon",
    "Scotch",
    "Irish Whiskey",
    "Irish Whisky",
  ]);
export const fetchAllDrinks = () =>
  fetchDrinksByAlcohol([
    "Whiskey",
    "Whisky",
    "Bourbon",
    "Scotch",
    "Irish Whiskey",
    "Irish Whisky",
    "Gin",
    "Rum",
    "Tequila",
    "Vodka",
  ]);
