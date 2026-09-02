import { useMutation, useQueryClient } from "@tanstack/react-query";

import { continentKeys, updateContinent } from "../api";

export function useUpdateContinent() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateContinent,
        onSuccess: () => {
            return queryClient.invalidateQueries({
                queryKey: continentKeys.all,
            });
        },
    });
}
