import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteFlowRule, flowRuleKeys } from "../api";

export function useDeleteFlowRule() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteFlowRule,

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: flowRuleKeys.all,
            });
        },
    });
}
