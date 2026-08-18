import { useMutation, useQueryClient } from "@tanstack/react-query";

import { countryKeys, createCountry } from "../api";
import type { CountryFormValues } from "../model";

export function useCreateCountry() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (values: CountryFormValues) => createCountry(values),
        onSuccess: () => {
            return queryClient.invalidateQueries({
                queryKey: countryKeys.lists(),
            });
        },
    });
}
