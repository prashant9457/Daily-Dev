import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodo } from "@/api/todo.api";

export function useDeleteTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTodo,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });
}