import "dotenv/config";
import express from "express";
import cors from "cors";
import todoRoutes from "./routes/todo.routes.js";
import userRoutes from "./routes/auth.routes.js"
import config from "config";
const app = express();

if(!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR : jwtPrivateKey is not defined or is empty.');
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