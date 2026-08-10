import { useMutation, useQueryClient } from "@tanstack/react-query";

import { airportKeys, createAirport } from "../api";
import type { Airport } from "../model";

export function useCreateAirport() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createAirport,

        onSuccess: (newAirport) => {
            queryClient.setQueryData<Airport[]>(airportKeys.all, (currentAirports = []) => [
                ...currentAirports,
                newAirport,
            ]);
        },
    });
}
