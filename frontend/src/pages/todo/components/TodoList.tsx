import type { Todo } from "@/types/todo";
import TodoItem from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
}
export default function TodoList({ todos }: TodoListProps) {

  const sortedTodos = [...todos].sort(
    (a, b) => Number(a.completed) - Number(b.completed)
  )

  return (
    <div className="max-w-7xl mx-auto p-6 grid gap-6
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-3">
      {sortedTodos.map((todo) => (
        <>
          <TodoItem
          key={todo._id}
          todo={todo}
        />
        </>
      ))}
    </div>
  );
}