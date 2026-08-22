import { searchUser } from "@/api/user.api";
import { useQuery } from "@tanstack/react-query";

export function useUserSearch(username: string) {
    return useQuery({
        queryKey: ['users', 'search', username],
        queryFn: () => searchUser(username),
        enabled: username.length >= 2,
    });
}