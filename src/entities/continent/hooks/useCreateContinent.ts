import { useMutation, useQueryClient } from "@tanstack/react-query";

import { continentKeys, type ContinentRequestValues, createContinent } from "../api";

export function useCreateContinent() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (values: ContinentRequestValues) => createContinent(values),
        onSuccess: () => {
            return queryClient.invalidateQueries({
                queryKey: continentKeys.all,
            });
        },
    });
}
