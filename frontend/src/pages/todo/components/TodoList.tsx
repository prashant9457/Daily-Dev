import type { Todo } from "@/types/todo";
import TodoItem from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
}

export default function TodoList({ todos }: TodoListProps) {
  const sortedTodos = [...todos].sort(
    (a, b) => Number(a.completed) - Number(b.completed)
  );

  return (
    <div className="w-full space-y-3">
      {sortedTodos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
        />
      ))}
    </div>
  );
}