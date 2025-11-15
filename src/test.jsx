import { useState } from "react";
import { AlcoholsList } from "./AlcoholsList";
import { MixersList } from "./MixersList";
import { GarnishList } from "./GarnishList";

export function BuildYourOwn() {
  const [open, setOpen] = useState(null);

  const sections = [
    { key: "alcohols", label: "Alcohols", Component: AlcoholsList },
    { key: "mixers", label: "Mixers", Component: MixersList },
    { key: "garnish", label: "Garnish", Component: GarnishList },
  ];

  return (
    <div className="max-w-lg mx-auto space-y-2">
      {sections.map(({ key, label, Component }) => (
        <div key={key} className="border rounded-lg overflow-hidden">
          <button
            className="flex w-full items-center justify-between bg-blue-500 text-white px-4 py-2 font-semibold hover:bg-blue-600 transition"
            onClick={() => setOpen(open === key ? null : key)}
          >
            {label}
            <span>{open === key ? "▼" : "▶"}</span>
          </button>

          {open === key && Component && (
            <div className="p-3 bg-gray-50">
              <Component />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
