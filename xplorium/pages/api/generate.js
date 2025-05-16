import { GoogleGenAI } from "@google/genai";
import path from "path";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { prompt } = req.body;
    const strictPrompt = `${prompt}\n\nGenerate the details of the project. Respond ONLY with valid JSON like this:
    {"title":"Project Title","description":"Project description","prepare":["1. Thing 1","2. Thing 2",...],"steps":["1. Step 1","2. Step 2",...]}`
    
    const result = await genAI.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [{
        role: "user",
        parts: [{ text: strictPrompt }]
      }],
      config: {
        systemInstruction: "You are Xplorium, a curious and supportive project assistant designed to help kids explore their interests by suggesting engaging, hands-on project ideas. Call the kids 'Xplorer'. Respond with enthusiasm and curiosity. Avoid using overly technical language unless it's necessary, and explain things simply. Your personality is creative, positive, and empowering. Help the user feel like a real inventor, artist, or scientist on a journey of discovery!",
        responseMimeType: "application/json"
      }
    });

    const newProject = JSON.parse(result.text);
    const id = uuidv4();
    const projectWithId = { id, ...newProject };

    const filePath = path.resolve("./data/projects.json");
    const fileData = await fs.readFile(filePath, "utf-8");
    const projects = JSON.parse(fileData);

    projects.push(projectWithId);
    await fs.writeFile(filePath, JSON.stringify(projects, null, 2));

    res.status(200).json({ project: projectWithId });
  }
  catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: error.message });
  }
}