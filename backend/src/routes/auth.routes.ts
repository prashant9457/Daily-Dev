import { Router } from "express";
import auth from "../middleware/auth.js"
import { registerUser } from "../controllers/user.controller.js";
import { loginUser, getCurrentUser } from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", auth, getCurrentUser)

export default router;