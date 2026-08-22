import Joi from "joi";
import mongoose from "mongoose";

export const Todo = mongoose.model("Todo", new mongoose.Schema({
        title: {
            type: String,
            required: true,
            trim: true,
            minLength: 3,
            maxLength: 100
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        description: {
            type: String,
            trim: true,
            default: "",
            maxLength: 1000
        },

        priority: {
            type: String,
            enum: ["low", "medium", "high"],
            default: "medium"
        },

        category: {
            type: String,
            trim: true,
            maxLength: 50,
            default: "General"
        },

        dueDate: {
            type: Date
        },

        completed: {
            type: Boolean,
            default: false
        },

        archived: {
            type: Boolean,
            default: false
        }
    })
);

export default function validateTodo(todo: {title: string, description: string, priority: string, category: string}) {
    const schema = Joi.object({
        title: Joi.string().trim().min(3).max(100).required(),
        description: Joi.string().trim().max(1000).optional().default(""),
        priority: Joi.string().valid("low", "medium", "high").default("medium"),
        category: Joi.string().trim().max(50).default("General"),
        dueDate: Joi.date().optional()
    });

    return schema.validate(todo);
}