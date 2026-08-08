import { toggleTodo } from "@/api/todo.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useToggleTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      completed,
    } : {
      id : string;
      completed : boolean
    }) => toggleTodo(id, completed) ,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['todos'],
      });
    },
  });
}