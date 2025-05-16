import fs from 'fs/promises';
import path from 'path';

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    const filePath = path.resolve('./data/projects.json');
    const fileData = await fs.readFile(filePath, 'utf8');
    const projects = JSON.parse(fileData);

    const project = projects.find(p => p.id === id);

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.status(200).json(project);
  } catch (error) {
    console.error("Error reading project file:", error);
    res.status(500).json({ error: error.message });
  }
}