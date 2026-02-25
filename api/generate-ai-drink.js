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

    // 🎲 Random chaos ingredient pool
    const wildCards = [
      "smoked rosemary",
      "black pepper syrup",
      "jalapeño jam",
      "espresso foam",
      "balsamic reduction",
      "toasted sesame syrup",
      "mango chili puree",
      "coconut cream",
      "absinthe rinse",
      "salted honey",
      "charred pineapple",
      "lavender bitters",
      "maple bacon fat wash",
    ];

    const randomWild = wildCards[Math.floor(Math.random() * wildCards.length)];

    // 🧠 Inject structural chaos into the user prompt
    const finalPrompt = wildMode
      ? `${prompt}. The drink must creatively incorporate ${randomWild}.`
      : prompt;

    // 🎛 Creativity tuning
    const temperature = wildMode ? 1.1 : 0.75;
    const top_p = wildMode ? 1.0 : 0.9;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
You are an experimental, chaotic mixologist AI.

Your job is to invent bold, ridiculous, over-the-top cocktail names and surprising ingredient combinations.

RULES:
- Respond with ONLY valid JSON
- No markdown
- No explanations
- No emojis
- Avoid boring classic formulas like just spirit + citrus + sweetener
- Be wildly creative
- Invent unexpected ingredient pairings
- Sometimes combine multiple base spirits
- Occasionally use culinary ingredients (herbs, spices, fats, infused elements)
- In wild mode, the drink should feel like it came from a chaotic underground speakeasy run by a mad scientist
- The drink name should be outrageous, playful, absurd, or slightly inappropriate (sometimes even sexual sounding)

The JSON MUST follow this exact shape:

{
  "name": "Cocktail Name",
  "ingredients": ["ingredient with measurement"],
  "instructions": "Step-by-step instructions as a string",
  "taste_profile": ["sweet", "spicy", "savory", "smoky"]
}
          `,
        },
        {
          role: "user",
          content: finalPrompt,
        },
      ],
      temperature,
      top_p,
      max_tokens: 350,
    });

    let aiText = completion.choices[0].message.content;
    aiText = aiText.replace(/```json|```/g, "").trim();

    let drink;
    try {
      drink = JSON.parse(aiText);
    } catch (err) {
      console.error("Failed to parse AI output:", aiText);
      drink = {
        name: "Unhinged Mystery",
        ingredients: ["1 oz mystery spirit", "1 oz something questionable"],
        instructions: aiText,
        taste_profile: ["chaotic"],
      };
    }

    res.status(200).json(drink);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate AI drink" });
  }
}
