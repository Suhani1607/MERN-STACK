const express=require('express');
const app=express();
const port=2000;

app.use(express.json());
app.get('/',(req,res)=>{
    return res.json({message:`API is running With port :  ${port}`});
})

 

app.listen(port,()=>{
    console.log(`First Server at http://localhost:${port}`);
})