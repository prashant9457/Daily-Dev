import type { Request, Response } from "express";
import { Todo } from "../models/todo.model.js";
import validateTodo from "../models/todo.model.js";

export async function getTodos(req: Request, res: Response) {
    try {
        const todos = await Todo.find();

        return res.status(200).json({
            success: true,
            data: todos,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch todos",
        });
    }
}

export async function createTodo(req: Request, res: Response) {
    try {
        const result = validateTodo(req.body);

        if (result.error) {
            return res.status(400).json({
                success: false,
                errors: result.error.details,
            });
        }

        const todo = await Todo.create(result.value);

        return res.status(201).json({
            success: true,
            data: todo,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to create todo",
        });
    }
}

export async function updateTodo(req: Request, res: Response) {
    try {
        const todo = await Todo.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!todo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: todo,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to update todo",
        });
    }
}

export async function deleteTodo(req: Request, res: Response) {
    try {
        const { id } = req.params;

        const deletedTodo = await Todo.findByIdAndDelete(id);

        if (!deletedTodo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Todo deleted successfully",
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to delete todo",
        });
    }
}