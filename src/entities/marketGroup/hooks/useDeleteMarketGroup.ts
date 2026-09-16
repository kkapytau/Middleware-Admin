import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteMarketGroup, marketGroupKeys } from "../api";

export function useDeleteMarketGroup() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteMarketGroup,

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: marketGroupKeys.all,
            });
        },
    });
}
