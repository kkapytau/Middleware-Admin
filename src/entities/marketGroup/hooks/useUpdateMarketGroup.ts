import { useMutation, useQueryClient } from "@tanstack/react-query";

import { marketGroupKeys, updateMarketGroup } from "../api";

export function useUpdateMarketGroup() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateMarketGroup,

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: marketGroupKeys.all,
            });
        },
    });
}
