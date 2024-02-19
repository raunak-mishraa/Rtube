// require("dotenv").config({ path: "./.env" });
import { app } from "./app.js";
import ConnectDB from "./db/index.js";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

//jab async function jab bhi complete hota hain toh woh promise return karta hain, so we have to use then and catch
ConnectDB()
.then(()=>{
    app.on("error", (error) => console.error(error));//database connected but express is not connected , error is an event like 'click' in js
    app.listen(process.env.PORT || 8000, () => console.log(`Server running on port ${process.env.PORT}`));// database start hua but server listen nahi kar raha thats why hum yaha listen kar rahe hain, basically agar database connect hota hain toh server start hoga
})
.catch((e) => console.log("MongoDB connection failed", e.message));












// import express from "express";
// const app = express();
// ;(async () =>{
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         app.on("error", (error) => console.error(error));
//         app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
//     } catch (error) {
//         console.error(error);
//         throw error
//     }
// })()