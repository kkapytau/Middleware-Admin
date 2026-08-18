import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createFlowFunction, flowFunctionKeys } from "../api";

export function useCreateFlowFunction() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createFlowFunction,

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: flowFunctionKeys.all,
            });
        },
    });
}
