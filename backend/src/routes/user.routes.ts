import { Router } from "express";
import auth from "../middleware/auth.js";
import { getUsersPresence, searchUser } from "../controllers/user.controller.js";


const router = Router();

router.get("/search", auth, searchUser);
router.post("/presence", auth, getUsersPresence);

export default router;