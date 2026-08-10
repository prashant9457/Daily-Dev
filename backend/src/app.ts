import express from "express";
import cors from "cors";
import todoRoutes from "./routes/todo.routes.js";
import userRoutes from "./routes/auth.routes.js"
import config from "config";
import type { String } from "lodash";
const app = express();

if(!config.has('jwtPrivateKey')) {
    console.error('FATAL ERROR : jwtPrivateKey is not defined.');
    process.exit(1);
}
// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/todos", todoRoutes);
app.use("/api/auth", userRoutes);

app.get("/", (req, res) => {
    res.send("Backend is running");
});

export default app; 