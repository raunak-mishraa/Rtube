import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
app.use(express.json({limit: "1gkg"}));//limit of json files
app.use(express.urlencoded({ extended: true, limit: "16kg"}));
app.use(express.static("public"));
app.use(cookieParser())//server se user ka browser ki cookie ko access karna and set karna


export { app }