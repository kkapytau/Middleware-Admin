import { useMutation, useQueryClient } from "@tanstack/react-query";

import { countryKeys, deleteCountry } from "../api";

export function useDeleteCountry() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => deleteCountry(id),
        onSuccess: () => {
            return queryClient.invalidateQueries({
                queryKey: countryKeys.lists(),
            });
        },
    });
}
