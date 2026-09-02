import { useMutation, useQueryClient } from "@tanstack/react-query";

import { countryKeys, type CountryRequestValues, createCountry } from "../api";

export function useCreateCountry() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (values: CountryRequestValues) => createCountry(values),
        onSuccess: () => {
            return queryClient.invalidateQueries({
                queryKey: countryKeys.all,
            });
        },
    });
}
