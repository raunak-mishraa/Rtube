// require("dotenv").config({ path: "./.env" });
import { app } from "./app.js";
import ConnectDB from "./db/index.js";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });
ConnectDB()
.then(()=>{
    app.on("error", (error) => console.error(error));
    app.listen(process.env.PORT || 8000, () => console.log(`Server running on port ${process.env.PORT}`));
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