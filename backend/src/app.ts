import express from "express";
import cors from "cors";
import todoRoutes from "./routes/todo.routes.js";
import userRoutes from "./routes/auth.routes.js"

const app = express();

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