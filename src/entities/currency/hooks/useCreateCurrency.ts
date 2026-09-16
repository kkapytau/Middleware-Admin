import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createCurrency, currencyKeys } from "../api";

export function useCreateCurrency() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createCurrency,

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: currencyKeys.all,
            });
        },
    });
}
