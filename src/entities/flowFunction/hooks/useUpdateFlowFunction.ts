import { useMutation, useQueryClient } from "@tanstack/react-query";

import { flowFunctionKeys, updateFlowFunction } from "../api";

export function useUpdateFlowFunction() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateFlowFunction,

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: flowFunctionKeys.all,
            });
        },
    });
}
