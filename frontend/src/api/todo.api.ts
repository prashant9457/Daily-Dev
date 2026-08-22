import { axiosInstance } from "./apiClient";

export async function getTodos() {
  const response = await axiosInstance.get("/todos");
  return response.data.data;
}

export async function createTodo(data: {
  title: string;
  description?: string;
  priority?: "low" | "medium" | "high";
  category?: string;
  dueDate?: Date;
}) {
  const response = await axiosInstance.post("/todos", data);
  return response.data;
}

export async function updateTodo(id: string, data: object) {
  const response = await axiosInstance.patch(`/todos/${id}`, data);
  return response.data;
}

export async function deleteTodo(id: string) {
  const response = await axiosInstance.delete(`/todos/${id}`);
  return response.data;
}

export async function toggleTodo(id: string , completed: boolean) {
  const response = await axiosInstance.patch(`/todos/${id}`,{
    completed,
  })

  return response.data;
}