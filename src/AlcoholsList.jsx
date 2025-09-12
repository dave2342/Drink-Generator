export function AlcoholsList() {
  const alcohols = ["Vodka", "Gin", "Rum", "Tequila", "Whiskey"];

  return (
    <ul className="pl-4 list-disc" style={{ listStyleType: "none" }}>
      {alcohols.map((item, index) => (
        <li key={index} className="text-black">
          <label className="flex items-center gap=2">
            <input type="checkbox" />
            {item}
          </label>
        </li>
      ))}
    </ul>
  );
}
