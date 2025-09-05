import { DefaultContext } from "react-icons";
import { BuildYourOwn } from "./FeatureBuildYourOwn";
import { CreativeCocktails } from "./FeatureCreativeCocktails";
import { RandomGenerator } from "./FeatureRandomGenerator";
import { DefaultPage } from "./FeatureDefault";

export function FeatureView({
  currentView,
  alcohol,
  setAlcohol,
  setSelectedDrink,
}) {
  if (currentView === "alcohols") {
    return (
      <>
        {/* <div className="test">
          <div className="test-wrapper"> */}
        <RandomGenerator
          alcohol={alcohol}
          setAlcohol={setAlcohol}
          setSelectedDrink={setSelectedDrink}
        />
        {/* </div>
        </div> */}
      </>
    );
  } else if (currentView === "byo") {
    return <BuildYourOwn />;
  } else if (currentView === "creative") {
    return <CreativeCocktails />;
  } else if (currentView === "default") {
    return (
      <div className="test">
        <div className="content-wrapper">
          <DefaultPage />
        </div>
      </div>
    );
  }
  return null;
}
