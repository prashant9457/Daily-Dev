import type { AuthenticatedWebSocket } from "./types.js"

const connections = new Map<string, Set<AuthenticatedWebSocket>>();

export function addConnection(socket: AuthenticatedWebSocket) {
    const userId = socket.userId;

    let userConnections = connections.get(userId);

    if(!userConnections) {
        userConnections = new Set();
        connections.set(userId, userConnections);
    }

    userConnections.add(socket);

    console.log(`User ${userId} is online. Connections: ${userConnections.size}`);

}

export function removeConnection(socket: AuthenticatedWebSocket) {
    const userId = socket.userId;

    const userConnections = connections.get(userId);

    if(!userConnections) return;

    userConnections.delete(socket);

    if(userConnections.size === 0) {
        connections.delete(userId);
        console.log(`User ${userId} is offine`);
    } else {
        console.log(`User ${userId} still has ${userConnections.size} connection(s)`);
    }
}

export function isUserOnline(userId: string) {
    return connections.has(userId);
}