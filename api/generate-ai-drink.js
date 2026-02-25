// /api/generate-ai-drink.js
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { prompt, wildMode } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // Dynamic creativity settings
    const temperature = wildMode ? 1.05 : 0.75;
    const top_p = wildMode ? 1.0 : 0.9;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
You are a cocktail-generating API.

RULES:
- Respond with ONLY valid JSON
- Do NOT include markdown
- Do NOT include explanations
- Do NOT wrap the response in backticks
- Do NOT include emojis
- Be creative and avoid repeating common cocktail names
${wildMode ? "- Push flavor boundaries and surprise the user." : ""}

The JSON MUST follow this exact shape:

{
  "name": "Cocktail Name",
  "ingredients": ["ingredient with measurement"],
  "instructions": "Step-by-step instructions as a string",
  "taste_profile": ["sweet", "fruity", "bitter"]
}
          `,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature,
      top_p,
      max_tokens: 300,
    });

    let aiText = completion.choices[0].message.content;
    aiText = aiText.replace(/```json|```/g, "").trim();

    let drink;
    try {
      drink = JSON.parse(aiText);
    } catch (err) {
      console.error("Failed to parse AI output:", aiText);
      drink = {
        name: "Mystery Cocktail",
        ingredients: ["1 oz alcohol", "1 oz mixer"],
        instructions: aiText,
        taste_profile: ["creative"],
      };
    }

    res.status(200).json(drink);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate AI drink" });
  }
}
