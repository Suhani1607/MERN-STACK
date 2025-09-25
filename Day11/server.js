const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
app.use(express.json());

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);
const dbName = "testDB";

let db, projectsCollection;

async function startServer() {
  try {
    await client.connect();
    db = client.db(dbName);
    projectsCollection = db.collection("projects");
    console.log("Connected to MongoDB");

    app.listen(3000, () => console.log("Server running on port 3000"));
  } catch (err) {
    console.error(err);
  }
}

startServer();
app.get("/api/projects", async (req, res) => {
  try {
    const projects = await projectsCollection.find().toArray();
    res.status(200).json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
app.get("/api/projects/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const objectId = new ObjectId(id);

    const project = await projectsCollection.findOne({ _id: objectId });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
app.post("/api/projects", async (req, res) => {
  try {
    const projectData = req.body;

    const result = await projectsCollection.insertOne(projectData);

    res.status(201).json({
      message: "Project created successfully",
      projectId: result.insertedId
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
})
app.put("/api/projects/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const objectId = new ObjectId(id);
    const updateData = req.body;

    const result = await projectsCollection.updateOne(
      { _id: objectId },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({ message: "Project updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
})
app.delete("/api/projects/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const objectId = new ObjectId(id);

    const result = await projectsCollection.deleteOne({ _id: objectId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(204).send(); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
