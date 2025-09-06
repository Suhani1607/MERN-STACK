const express = require("express");
const app = express();
const PORT = 5001;
app.use(express.json());
const projects = [
  { id: 1, name: "Expense Tracker",tech: ["React", "Node.js"] },
  { id: 2, name: "Todo App", tech: ["React", "Context API"] },
  { id: 3, name: "Myntra Clone",  tech: ["React", "HTML,CSS,JavaScript"] }
];
const experience = [
  { id: 1, role: "UI/UX Intern",  duration: "3 months", skills: ["Figma"] },
  { id: 2, role: "Frontend Developer Intern",  duration: "6 months", skills: ["React", "Bootstrap"] }
];


app.get("/api/projects", (req, res) => {
  res.json(projects);
});

app.get("/api/experience", (req, res) => {
  res.json(experience);
});

app.get("/api/projects/:id", (req, res) => {
  const projectId = parseInt(req.params.id);
  const project = projects.find(p => p.id === projectId);

  if (!project) {
    return res.status(404).json({ error: "Project not found" });
  }

  res.json(project);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
