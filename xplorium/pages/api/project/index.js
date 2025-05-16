import fs from "fs";
import path from "path";

const dataPath = path.join(process.cwd(), "data", "projects.json");

export default function handler(req, res) {
  if (req.method === "GET") {
    try {
      const file = fs.readFileSync(dataPath, "utf-8");
      const projects = JSON.parse(file);
      res.status(200).json(projects);
    }
    catch (err) {
      res.status(500).json({ error: "Failed to load projects" });
    }
  }
  else {
    res.status(405).json({ error: "Method not allowed" });
  }
}