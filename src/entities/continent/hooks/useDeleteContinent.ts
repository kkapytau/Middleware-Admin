import { useMutation, useQueryClient } from "@tanstack/react-query";

import { continentKeys, deleteContinent } from "../api";

export function useDeleteContinent() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => deleteContinent(id),
        onSuccess: () => {
            return queryClient.invalidateQueries({
                queryKey: continentKeys.lists(),
            });
        },
    });
}
