import type { Todo } from "@/types/todo";
import TodoItem from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
}
export default function TodoList({ todos }: TodoListProps) {

  return (
    <div className="max-w-7xl mx-auto p-6 grid gap-6
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-3">
      {todos.map((todo, count) => (
        <>
          <TodoItem
          key={todo._id}
          todo={todo}
          index={count + 1}
        />
        </>
      ))}
    </div>
  );
}