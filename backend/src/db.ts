import mongoose from "mongoose";

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI!)
        console.log("mongoDB Connected");
    }
    catch (error) {
        console.error("could not connect to DB...");
        console.error(error);
    }    
}

export default connectDB;

