import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteFlowFunction } from "../api";
import { flowFunctionKeys } from "./useFlowFunctions";

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
