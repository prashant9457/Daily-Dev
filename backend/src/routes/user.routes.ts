import { Router } from "express";
import auth from "../middleware/auth.js";
import { searchUser } from "../controllers/user.controller.js";


const router = Router();

router.get("/search", auth, searchUser);

export default router;