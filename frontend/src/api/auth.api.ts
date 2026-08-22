import { axiosInstance } from "./apiClient";

export interface LoginData {
  email: string;
  password: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
}

export async function loginUser(data: LoginData): Promise<User> {
  const response = await axiosInstance.post<User>( "/auth/login", data );
  return response.data;
}