import { useState } from "react";

export function CreativeCocktails() {
  const [prompt, setPrompt] = useState("");
  const [drink, setDrink] = useState(null);
  const [loading, setLoading] = useState(false);
  const [wildMode, setWildMode] = useState(false);

  async function generateDrink() {
    if (!prompt.trim()) return;

    setLoading(true);
    setDrink(null);

    try {
      // Call your backend API
      const response = await fetch("/api/generate-ai-drink", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, wildMode: Boolean(wildMode) }),
      });

      if (!response.ok) {
        throw new Error("Backend error");
      }

      const data = await response.json(); // backend returns JSON
      setDrink(data);
    } catch (err) {
      console.error("Error generating drink:", err);
      alert("Oops! Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2>AI Creative Cocktails</h2>
      <textarea
        placeholder="Describe your drink... (e.g. sweet, fruity rum drink with pear juice)"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={4}
      />

      <br />

      {/* <button onClick={generateDrink} disabled={loading}>
        {loading ? "Mixing..." : "Generate Drink"}
      </button> */}

      <button
        onClick={() => setWildMode(!wildMode)}
        className={wildMode ? "wild-toggle active" : "wild-toggle"}
      >
        {wildMode ? "🔥 Wild Mode ON" : "Wild Mode OFF"}
      </button>
      <button onClick={generateDrink} disabled={loading}>
        {loading ? "Mixing..." : "Generate Drink"}
      </button>

      {loading && <p>🍹 Shaking the cocktail...</p>}

      {drink && (
        <div className={wildMode ? "drink-card wild" : "drink-card"}>
          {wildMode && (
            <div className="wild-badge">🔥 WILD MODE ACTIVATED 🔥</div>
          )}

          <h3 className="drink-name">{drink.name}</h3>

          <strong>Ingredients:</strong>
          <ul>
            {drink.ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <strong>Instructions:</strong>
          <p>{drink.instructions}</p>

          <strong>Taste Profile:</strong>
          <p>{drink.taste_profile.join(" • ")}</p>
        </div>
      )}
    </div>
  );
}
