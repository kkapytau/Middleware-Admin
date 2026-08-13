import { useMutation, useQueryClient } from "@tanstack/react-query";

import { flowKeys, updateFlow } from "../api";

export function useUpdateFlow() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateFlow,

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: flowKeys.all,
            });
        },
    });
}
