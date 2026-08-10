import { useMutation, useQueryClient } from "@tanstack/react-query";

import { airportKeys, updateAirport } from "../api";
import type { Airport } from "../model";

export function useUpdateAirport() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateAirport,

        onSuccess: (updatedAirport) => {
            queryClient.setQueryData<Airport[]>(airportKeys.all, (currentAirports = []) =>
                currentAirports.map((airport) =>
                    airport.id === updatedAirport.id ? updatedAirport : airport,
                ),
            );
        },
    });
}
