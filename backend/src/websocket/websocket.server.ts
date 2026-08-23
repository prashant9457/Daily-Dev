import { parseCookie } from "cookie";
import http from "http";
import { WebSocketServer } from "ws";
import { verifyToken } from "../utils/verifyToken.js";
import type { AuthenticatedWebSocket } from "./types.js";
import { addConnection, removeConnection } from "./presence.js";

export function setupWebSocket(server: http.Server) {
    const wss = new WebSocketServer({
        noServer: true,
    });

    server.on('upgrade', (request, socket, head) => {
        const cookies = parseCookie(request.headers.cookie ?? "");

        const token = cookies.token;

        if(!token) {
            socket.write("HTTP/1.1 401 Unauthorized\r\n");
            socket.destroy();
            return;
        }
        let userId : string;
        try {

            const decoded = verifyToken(token);
            userId = decoded._id;

        } catch {
            socket.write("HTTP/1.1 401 Unauthorized\r\n");
            socket.destroy();
            return;
        }

        wss.handleUpgrade(request, socket, head, (ws) => {
            const authenticatedSocket = ws as AuthenticatedWebSocket;
            authenticatedSocket.userId = userId;
            wss.emit("connection", authenticatedSocket, request);
        });
    });

    wss.on('connection', (socket: AuthenticatedWebSocket) => {
        console.log(`WebSocket client connected: ${socket.userId}`);
        addConnection(socket);

        socket.on('close', ()=> {
            console.log(`WebSocket client disconnected: ${socket.userId}`);
            removeConnection(socket);
        });
    });

    return wss;
}