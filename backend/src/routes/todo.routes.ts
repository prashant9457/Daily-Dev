import { Router } from "express";
// @ts-ignore
import auth from '../middleware/auth.js';

import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todo.controller.js";

const router = Router();

router.get("/", getTodos);
router.post("/", auth, createTodo);
router.patch("/:id", updateTodo);
router.delete("/:id", deleteTodo);

export default router;