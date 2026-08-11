import { useMutation, useQueryClient } from "@tanstack/react-query";

import { airportKeys, deleteAirport } from "../api";

export function useDeleteAirport() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteAirport,

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: airportKeys.all,
            });
        },
    });
}
