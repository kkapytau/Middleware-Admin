import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createMarketGroup, marketGroupKeys } from "../api";

export function useCreateMarketGroup() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createMarketGroup,

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: marketGroupKeys.all,
            });
        },
    });
}
