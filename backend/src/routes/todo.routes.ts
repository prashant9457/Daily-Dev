import { Router } from "express";
import auth from '../middleware/auth.js';

import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todo.controller.js";

const router = Router();

router.get("/", auth, getTodos);
router.post("/", auth, createTodo);
router.patch("/:id", auth, updateTodo);
router.delete("/:id", auth, deleteTodo);

export default router;