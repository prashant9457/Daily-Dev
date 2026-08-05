import mongoose from "mongoose";

// it is an object of mongoose.Schema class
const todoSchema = new mongoose.Schema( 
    {
        title: {
            type: String,
            required: [true, "Title is Required"],
            trim: true,
            maxlength: [100, "Title cannot exceed 100 characters"],
        },
        description: {
            type: String,
            trim: true,
            default: "",
            maxlength: 1500
        },

        completed: {
            type: Boolean,
            default: false
        },

        priority: { // user should not set priority to banana
            type: String,
            enum: ["low", "medium", "high"],
            default: "medium"
        },

        category: { // why not enum here?
            type: String,
            trim: true,
            default: "General"
        },    

        dueDate: {
            type: Date
        },

        archived: {
            type: Boolean,
            default: false
        },

    },
    {   // as a second argument to schema Mongoose handles createdAt and updatedAs type = Date
        timestamps: true, 
    }
);

todoSchema.index({
    title: "text"
});

// model is like a factory to the todoSchema object which is a mongoose.model class
const Todo = mongoose.model("Todo", todoSchema);

export default Todo;