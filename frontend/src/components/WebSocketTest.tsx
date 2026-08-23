import { useEffect } from "react"

export default function WebSocketTest() {
    useEffect(() => {
        const socket = new WebSocket("ws://localhost:3000");

        return () => {
            socket.close();
        };
        
    }, []);

    return <div> WebSocket Test </div>
}