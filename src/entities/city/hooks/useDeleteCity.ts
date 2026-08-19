import { useMutation, useQueryClient } from "@tanstack/react-query";

import { cityKeys, deleteCity } from "../api";

export function useDeleteCity() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteCity,
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: cityKeys.all,
            });
        },
    });
}
