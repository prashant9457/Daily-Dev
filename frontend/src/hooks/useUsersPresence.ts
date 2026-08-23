import { getUsersPresence } from "@/api/presence.api";
import { useQuery } from "@tanstack/react-query";

export function useUsersPresence(userIds: string[]) {
    return useQuery({
        queryKey: ["users", "presence", userIds],
        queryFn: () => getUsersPresence(userIds),
        enabled: userIds.length > 0,
    })
}