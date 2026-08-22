import { axiosInstance } from "./apiClient";

export interface LoginData {
  email: string;
  password: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  username: string;
}

export async function loginUser(data: LoginData): Promise<User> {
  const response = await axiosInstance.post<User>("/auth/login", data );
  return response.data;
}

export async function getCurrentUser() : Promise<User> {
  const response = await axiosInstance.get<User>("/auth/me");
  return response.data;
}

export async function logoutUser() {
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
}