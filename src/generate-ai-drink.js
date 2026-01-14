import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateAIDrink(userprompt) {
  const system = `
    You're an expert mixologist AI for cocktails. You must respond in JSON with:
    {
    "name": "...",
    "ingredients": ["..."],
    "instructions": "...",
    "taste_profile" : [...]
    }
    Use realistic measurements and follow the user's request.
    `;

  const response = await openai.chat.completions.create({
    model: "o4-mini",
    messages: [
      { role: "system", content: system },
      { role: "user", content: userPrompt },
    ],
    temperture: 0.8,
  });
  return JSON.parse(response.choices[0].message.content);
}
