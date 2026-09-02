import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { UpdateCountryParams } from "../api";
import { countryKeys, updateCountry } from "../api";

export function useUpdateCountry() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (params: UpdateCountryParams) => updateCountry(params),
        onSuccess: () => {
            return queryClient.invalidateQueries({
                queryKey: countryKeys.all,
            });
        },
    });
}
