import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createFlowFunction } from "../api";
import { flowFunctionKeys } from "./useFlowFunctions";

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
