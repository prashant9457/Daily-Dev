import { parseCookie } from "cookie";
import { verify } from "crypto";
import http from "http";
import { WebSocketServer } from "ws";
import { verifyToken } from "../utils/verifyToken.js";

export function setupWebSocket(server: http.Server) {
    const wss = new WebSocketServer({
        noServer: true,
    });

    server.on('upgrade', (request, socket, head) => {
        const cookies = parseCookie(request.headers.cookie ?? "");

        const token = cookies.token;

        if(!token) {
            socket.write("HTTP/1.1 401 Unauthorized");
            socket.destroy();
            return;
        }

        try {

            const decoded = verifyToken(token);
            console.log("WebSocket authenticated: ", decoded._id);

        } catch {
            socket.write("HTTP/1.1 401 Unauthorized");
            socket.destroy();
            return;
        }
    });

    wss.on('connection', (socket, request) => {
        console.log("Authenticated WebSocket client connected");

        socket.on('close', ()=> {
            console.log("WebSocket client disconnected");
        });
    });

    return wss;
}