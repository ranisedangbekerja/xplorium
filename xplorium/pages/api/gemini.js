import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { prompt } = req.body;
    const strictPrompt = `${prompt}\n\nMake the description not too long. Respond ONLY with valid JSON like this:
    [{"title":"Project 1, "description":"..."},{"title":"Project 2, "description":"..."},{"title":"Project 3, "description":"..."}]`
    
    const result = await genAI.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [{
        role: "user",
        parts: [{ text: strictPrompt }]
      }],
      config: {
        systemInstruction: "You are Xplorium, a curious and supportive project assistant designed to help kids explore their interests by suggesting engaging, hands-on project ideas. Respond with enthusiasm and curiosity. Avoid using overly technical language unless it's necessary, and explain things simply. Your personality is creative, positive, and empowering. Help the user feel like a real inventor, artist, or scientist on a journey of discovery!",
        responseMimeType: "application/json"
      }
    
    });
    res.status(200).json({ text: result.text });
  }
  catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: error.message });
  }
}