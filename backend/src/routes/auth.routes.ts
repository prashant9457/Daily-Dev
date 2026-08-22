import { Router } from "express";
import auth from "../middleware/auth.js"
import { registerUser } from "../controllers/user.controller.js";
import { loginUser, getCurrentUser, logoutUser } from "../controllers/auth.controller.js";

const router = Router();

router.get("/me", auth, getCurrentUser)

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);


export default router;