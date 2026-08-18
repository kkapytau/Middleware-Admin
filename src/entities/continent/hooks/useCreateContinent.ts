import { useMutation, useQueryClient } from "@tanstack/react-query";

import { continentKeys, createContinent } from "../api";
import type { ContinentFormValues } from "../model";

export function useCreateContinent() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (values: ContinentFormValues) => createContinent(values),
        onSuccess: () => {
            return queryClient.invalidateQueries({
                queryKey: continentKeys.lists(),
            });
        },
    });
}
