import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
app.use(express.json({limit: "10kb"}));//limit of json files
app.use(express.urlencoded({ extended: true, limit: "16kg"}));////url se data aayega toh usko parse karega and acept karega
app.use(express.static("public"));//kuchh files ko hum server pe hi rakhna chahte hain toh uske liye use hota hai
app.use(cookieParser())//server se user ke browser ki cookie ko access karna and set karna


//routes import
import userRouter from './routes/user.routes.js';

//routes declaration
app.use('/api/v1/users', userRouter)
//http://localhost:3000/users/register it will look like this


export { app }