import http from "http";
import { WebSocketServer } from "ws";

export function setupWebSocket(server: http.Server) {
    const wss = new WebSocketServer({
        noServer: true,
    });

    server.on('upgrade', (request, socket, head) => {
        console.log('WebSocket upgrade requested');
    });

    wss.on('connection', (socket, request) => {
        console.log("Authenticated WebSocket client connected");

        socket.on('close', ()=> {
            console.log("WebSocket client disconnected");
        });
    });

    return wss;
}