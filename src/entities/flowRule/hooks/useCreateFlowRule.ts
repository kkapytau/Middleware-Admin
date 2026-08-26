import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createFlowRule, flowRuleKeys } from "../api";

export function useCreateFlowRule() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createFlowRule,

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: flowRuleKeys.all,
            });
        },
    });
}
