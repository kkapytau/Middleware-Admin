import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteFlow, flowKeys } from "../api";

export function useDeleteFlow() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteFlow,

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: flowKeys.all,
            });
        },
    });
}
