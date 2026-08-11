import { useMutation, useQueryClient } from "@tanstack/react-query";

import { airportKeys, createAirport } from "../api";

export function useCreateAirport() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createAirport,

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: airportKeys.all,
            });
        },
    });
}
