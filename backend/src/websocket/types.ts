import type { WebSocket } from "ws";

export interface AuthenticatedWebSocket extends WebSocket {
    userId: string;
}