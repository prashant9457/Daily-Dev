import { useQuery } from "@tanstack/react-query";
import { getTodos } from "../api/todo.api";

export interface Todo {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  category: string;
  archived: boolean;
}

export function useTodos() {
    return useQuery<Todo[], Error>({
        queryKey: ["todos"],
        queryFn: getTodos
    });
}