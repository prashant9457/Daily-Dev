import { logoutUser } from "@/api/auth.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useLogout() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: logoutUser,

        onSuccess: () => {
            queryClient.setQueryData(["currentUser"], null);
        },

    });
}