import api from "./axios";

export async function getTodos() {
  const response = await api.get("/todos");
  return response.data.data;
}

export async function createTodo(data: {
  title: string;
  description?: string;
  priority?: "low" | "medium" | "high";
  category?: string;
  dueDate?: Date;
}) {
  const response = await api.post("/todos", data);
  return response.data;
}

export async function updateTodo(id: string, data: object) {
  const response = await api.patch(`/todos/${id}`, data);
  return response.data;
}

export async function deleteTodo(id: string) {
  const response = await api.delete(`/todos/${id}`);
  return response.data;
}

export async function toggleTodo(id: string , completed: boolean) {
  const response = await api.patch(`/todos/${id}`,{
    completed,
  })

  return response.data;
}