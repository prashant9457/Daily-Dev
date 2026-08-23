import { axiosInstance } from "./apiClient";

export interface UserPresence {
    userId: string;
    online: boolean;
}

export async function getUsersPresence (userIds: string[]) : Promise<UserPresence[]> {
    const response = await axiosInstance.post<UserPresence[]>("/users/presence", {userIds});
    return response.data;
}