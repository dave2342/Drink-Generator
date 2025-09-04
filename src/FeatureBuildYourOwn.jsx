import { useState } from "react";
import { AlcoholsList } from "./AlcoholsList";
import { MixersList } from "./MixersList";
import { GarnishList } from "./GarnishList";

export function BuildYourOwn() {
  const [openIngredients, setOpenIngredients] = useState(null);
  const sections = [
    { key: "alcohols", label: "Alcohols", Component: AlcoholsList },
    { key: "mixers", label: "Mixers", Component: MixersList },
    { key: "garnish", label: "Garnish", Component: GarnishList },
  ];

  return (
    <div className="flex h-64 border border-black-200">
      <div className="w-[20%] border-r border-black-200 p-2">
        {sections.map(({ key, label, Component }) => (
          <div key={key}>
            <button
              className={`block mb-2 w-full rounded-none bg-blue-500 text-white px-3 py-1 hover:bg-blue-600 hover:border-blue-600 transition-colors duration-300 box-border`}
              onClick={() =>
                setOpenIngredients(openIngredients === key ? null : key)
              }
            >
              {label}
            </button>

            {openIngredients === key && Component && <Component />}
          </div>
        ))}
      </div>
      <div className="flex flex-grow overflow-x-auto bg-transparent">
        <p> hello</p>
      </div>
      <div className="flex flex-grow overflow-x-auto bg-transparent">
        <p> drink appears here</p>
      </div>
    </div>
  );
}
