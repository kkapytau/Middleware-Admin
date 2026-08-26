import { useMutation, useQueryClient } from "@tanstack/react-query";

import { flowRuleKeys, updateFlowRule } from "../api";

export function useUpdateFlowRule() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateFlowRule,

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: flowRuleKeys.all,
            });
        },
    });
}
