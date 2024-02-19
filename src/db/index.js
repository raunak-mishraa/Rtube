import mongoose from "mongoose";
import {DB_NAME} from "../constants.js";

const ConnectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log('MOngoDB connected', connectionInstance.connection.host);
        // console.log(connectionInstance)
    } catch (error) {
        console.log('MOngoDB connection error', error);
        process.exit(1);
    }
}

export default ConnectDB;    