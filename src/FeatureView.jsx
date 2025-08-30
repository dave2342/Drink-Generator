import { BuildYourOwn } from "./FeatureBuildYourOwn";
import { CreativeCocktails } from "./FeatureCreativeCocktails";
import { RandomGenerator } from "./FeatureRandomGenerator";

export function FeatureView({
  currentView,
  alcohol,
  setAlcohol,
  setSelectedDrink,
}) {
  if (currentView === "alcohols") {
    return (
      <>
        {/* <div className="maybe"> */}
        <RandomGenerator
          alcohol={alcohol}
          setAlcohol={setAlcohol}
          setSelectedDrink={setSelectedDrink}
        />
        {/* </div> */}
      </>
    );
  } else if (currentView === "byo") {
    return <BuildYourOwn />;
  } else if (currentView === "creative") {
    return <CreativeCocktails />;
  }
  return null;
}
