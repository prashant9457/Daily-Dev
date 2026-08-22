import "dotenv/config";
import express from "express";
import cors from "cors";
import todoRoutes from "./routes/todo.routes.js";
import userRoutes from "./routes/user.routes.js"
import authRoutes from "./routes/auth.routes.js"
import config from "config";
import cookieParser from "cookie-parser";

const app = express();

if(!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR : jwtPrivateKey is not defined or is empty.');
    process.exit(1);
}
// Middleware
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/todos", todoRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
    res.send("Backend is running");
});

export default app; 