const express = require("express");
const { MongoClient } = require("mongodb");
const app = express();
const port = 3000;
app.use(express.json()); 
const url = "mongodb://127.0.0.1:27017"; 
const client = new MongoClient(url);
const dbName = "testDB"; 
let db, projectsCollection;
async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    db = client.db(dbName);
    projectsCollection = db.collection("projects"); 
  } catch (err) {
    console.error(" MongoDB connection failed:", err);
  }
}
connectDB();
app.post("/api/projects", async (req, res) => {
  try {
    const result = await projectsCollection.insertOne(project); 
    res.status(201).json({ message: "Project created", projectId: result.insertedId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating project" });
  }
});
app.get("/api/projects", async (req, res) => {
  try {
    const projects = await projectsCollection.find().toArray(); 
    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching projects" });
  }
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
