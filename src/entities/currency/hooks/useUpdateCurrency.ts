import { useMutation, useQueryClient } from "@tanstack/react-query";

import { currencyKeys, updateCurrency } from "../api";

export function useUpdateCurrency() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateCurrency,

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: currencyKeys.all,
            });
        },
    });
}
