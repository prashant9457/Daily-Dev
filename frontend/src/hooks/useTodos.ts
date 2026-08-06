import { useQuery } from "@tanstack/react-query";
import { getTodos } from "../api/todo.api";
import type { Todo } from "@/types/todo";

export function useTodos() {
    return useQuery<Todo[], Error>({
        queryKey: ["todos"],
        queryFn: getTodos
    });
}