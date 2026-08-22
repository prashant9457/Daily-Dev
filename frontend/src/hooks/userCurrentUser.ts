import { getCurrentUser } from "@/api/auth.api";
import { useQuery } from "@tanstack/react-query";

export function useCurrentUser() {
    return useQuery({
        queryKey: ["currentUser"],
        queryFn: getCurrentUser,
        retry: false,
    })
}