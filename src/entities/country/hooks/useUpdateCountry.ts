import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { UpdateCountryParams } from "../api";
import { countryKeys, updateCountry } from "../api";

export function useUpdateCountry() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (params: UpdateCountryParams) => updateCountry(params),
        onSuccess: (_, { id }) => {
            return Promise.all([
                queryClient.invalidateQueries({
                    queryKey: countryKeys.lists(),
                }),
                queryClient.invalidateQueries({
                    queryKey: countryKeys.detail(id),
                }),
            ]);
        },
    });
}
