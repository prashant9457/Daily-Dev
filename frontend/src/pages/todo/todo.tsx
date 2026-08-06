import { useTodos } from "../../hooks/useTodos";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";

export default function Todo() {
  const { data, isLoading, error } = useTodos();

  if(isLoading) {
    return <> Loading ... </>
  }

  if(error) {
    return <> {error as Error}</>
  }

  return (

    <>
      <h1 className="text-4xl font-bold text-center mb-8">
        Todo Application
      </h1>

      <AddTodo />

      <TodoList todos={data ?? []} />
    </>
  );
}