import dotenv from 'dotenv';
import app from "./app.js";
import connectDB from './db.js';
import http from "http";
import { WebSocketServer } from "ws";

dotenv.config();

const port = process.env.PORT || 3000;

async function startServer() {
    await connectDB();
    // both websocket and http share the same server
    const server = http.createServer(app);
    const wss = new WebSocketServer({server});

    wss.on("connection", (socket) => {
        console.log("WebSocket client connected");
        
        socket.on("close", () => {
            console.log("WebSocket client disconnected");
        });
    });

    server.listen((port), () => { console.log(`Server Running on ${port}`); });
}

startServer();