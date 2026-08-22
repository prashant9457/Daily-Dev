import { axiosInstance } from "./apiClient";
import type { User } from "./auth.api";

export async function searchUser(username: string): Promise<User[]> {
    const response = await axiosInstance.get("/users/search", {
        params: {username},
    });

    return response.data.data;
}