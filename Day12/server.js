const express = require('express')
const {MongoClient ,ObjectId}=require("mongodb")

const app=express();
app.use(express.json())


const url="mongodb://127.0.0.1:27017"
const client = new MongoClient(url)
const dbName="blogDB"

async function main() {
    await client.connect()
    console.log("Connected to MongoDB")
    const db=client.db(dbName)
    const posts=db.collection("posts")



    //routes

//Create Blog Post

   app.post("/api/posts",async(req,res)=>{
    const data=req.body;
    const result=await posts.insertOne(data)
    res.status(201).json({
        message:"Post created",
        id:result.insertedId
    })
   })


   //Get All Posts

   app.get("/api/posts",async(req,res)=>{
    const result=await posts.find().toArray();
    res.json(result)
   })
    

   //Get Uniq Post by id
   app.get("/api/posts/:id",async(req,res)=>{
    const id=req.params.is;
    const post=await posts.findOne({_id:new ObjectId(id)})
    if(!post)
        return res.status(404).json({error:"Post not found"})
    res.json(post)
   })

   //Update Post

   app.put("/api/posts/:id",async(req,res)=>{
    const id=req.params.id;
    const data=req.body;

    const result=await posts.updateOne({_id:new ObjectId(id)},
    {$set:data})
    if(result.matchedCount==0) return res.status(404).json({error:"Post not found"})
        res.json({message:"Post updated"})
   })

   //Delete Post

   app.delete("/api/posts/:id",async(req,res)=>{
    const id=req.params.id;
    const result=await posts.deleteOne({_id:new ObjectId(id)})

    if(result.deleteCount==0)
        return res.status(404).json({error:"Post not found"})

    res.json({message:"Post deleted"})
   })

   app.listen(3000,()=>
console.log("Server running on http://localhost:3000"))
}
main().catch(console.error)