import dotenv from 'dotenv';
import app from "./app.js";
import connectDB from './db.js';

dotenv.config();

const port = process.env.PORT || 3000;

async function startServer() {
    await connectDB();

    app.listen(port, (error) => {
        if(error) {
            console.error(error);
        }
        else {
            console.log(`Server Running on ${port}`);
        }
    })
}

startServer();