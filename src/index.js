// require('dotenv').config({ path: './env' })
import dotenv from "dotenv"
import connectDB from "./db/index.js"
import { app } from './app.js'

// import mongoose from "mongoose";
// import { DB_NAME } from "./constants"


dotenv.config({
    path: "./env"
})



connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000, () => {
        console.log(`App  listion on port ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("MONGO DB connection failed , in index.js ",err);
})













/*
// function connectDB(){}
import express from "express";
const app=express()
// connectDB()

// iffe
( async ()=>{
    try {
       await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
       app.on("error",(error)=>{
        console.log("ERROR: ",error);
        throw error
       })

       app.listen(process.env.PORT, () => {
        console.log(`App lis listion on port ${process.env.PORT}`);
       })


    } catch (error) {
        console.error("ERROR: ", error)
        throw error
    }
})()

*/