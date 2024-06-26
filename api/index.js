import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user-route.js";
dotenv.config();

mongoose
.connect(process.env.MONGO)
.then(() =>{
    console.log("Connected to mongo");
})
.catch((err) =>{
    console.log("error!!");
});
const app = express();

app.listen(3000, ()=>{
    console.log('server is running at port 3000');
});

app.use('/api/user', userRoute);