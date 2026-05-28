import express from 'express';
const app=express();

app.get("/",(req,res)=>{
    res.status(200).send("server is liveasfdaf");
})

app.listen(3000,()=>{
    console.log("server is running on 3000");
})