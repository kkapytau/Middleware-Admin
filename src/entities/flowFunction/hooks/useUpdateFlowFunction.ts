import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateFlowFunction } from "../api";
import { flowFunctionKeys } from "./useFlowFunctions";

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
