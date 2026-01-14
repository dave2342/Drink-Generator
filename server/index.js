import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();
const app = express();
const PORT = 5000;
//ai drinks
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.use(cors());
app.use(express.json());

app.post("/api/generate-ai-drink", async (req, res) => {
  // console.log("API HIT:", req.body);

  // app.post("/api/generate-ai-drink", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

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
      temperature: 0.9,
      max_tokens: 300,
    });

    let aiText = completion.choices[0].message.content;

    // 🧹 Remove accidental markdown fences if they appear
    aiText = aiText.replace(/```json|```/g, "").trim();
    console.log("RAW AI OUTPUT:\n", aiText);

    // Try to parse AI output as JSON
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

    res.json(drink);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate AI drink" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
