const express = require('express')
const {MongoClient ,ObjectId}=require("mongodb")

const app=express();
app.use(express.json())


const url="mongodb://127.0.0.1:27017"
const client = new MongoClient(url)
const dbName="TaskMgmtDB"

async function main() {
    await client.connect()
    console.log("Connected to MongoDB")
    const db=client.db(dbName)
    const tasks=db.collection("tasks")



    

   app.post("/api/tasks",async(req,res)=>{
    const data=req.body;
    const result=await tasks.insertOne(data)
    res.status(201).json({
        message:"Added new task to do",
        id:result.insertedId
    })
   })



   app.get("/api/tasks",async(req,res)=>{
    const result=await tasks.find().toArray();
    res.json(result)
   })
    

   app.put("/api/tasks/:id",async(req,res)=>{
    const id=req.params.id;
    const data=req.body;

    const result=await tasks.updateOne({_id:new ObjectId(id)},
    {$set:data})
    if(result.matchedCount==0) return res.status(404).json({error:"No this task found or created"})
        res.json({message:"Task Updated"})
   })



   app.delete("/api/tasks/:id",async(req,res)=>{
    const id=req.params.id;
    const result=await tasks.deleteOne({_id:new ObjectId(id)})

    if(result.deleteCount==0)
        return res.status(404).json({error:"task not found"})

    res.json({message:"Task is completed"})
   })

   app.listen(3000,()=>
console.log("Server running on http://localhost:3000"))
}
main().catch(console.error)