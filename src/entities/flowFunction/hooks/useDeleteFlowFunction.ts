import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteFlowFunction, flowFunctionKeys } from "../api";

export function useDeleteFlowFunction() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteFlowFunction,

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: flowFunctionKeys.all,
            });
        },
    });
}
