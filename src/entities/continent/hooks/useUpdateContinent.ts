import { useMutation, useQueryClient } from "@tanstack/react-query";

import { continentKeys, updateContinent } from "../api";

export function useUpdateContinent() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateContinent,
        onSuccess: (_, { id }) => {
            return Promise.all([
                queryClient.invalidateQueries({
                    queryKey: continentKeys.lists(),
                }),
                queryClient.invalidateQueries({
                    queryKey: continentKeys.detail(id),
                }),
            ]);
        },
    });
}
