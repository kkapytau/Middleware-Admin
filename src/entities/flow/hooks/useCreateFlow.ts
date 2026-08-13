import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createFlow, flowKeys } from "../api";

export function useCreateFlow() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createFlow,

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: flowKeys.all,
            });
        },
    });
}
