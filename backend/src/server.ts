import dotenv from 'dotenv';
import app from "./app.js";
import connectDB from './db.js';
import http from "http";
import { setupWebSocket } from "./websocket/websocket.server.js";

dotenv.config();

const port = process.env.PORT || 3000;

async function startServer() {
    await connectDB();
    // both websocket and http share the same server
    const server = http.createServer(app);
    
    setupWebSocket(server);

    server.listen((port), () => { console.log(`Server Running on ${port}`); });
}

startServer();