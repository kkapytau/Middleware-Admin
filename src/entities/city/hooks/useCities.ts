import { useQuery } from "@tanstack/react-query";

import { cityKeys, getCities, getCity } from "../api";

export function useCities() {
    return useQuery({
        queryKey: cityKeys.list(),
        queryFn: getCities,
    });
}

export function useCity(id: number | undefined, options?: { enabled?: boolean }) {
    return useQuery({
        queryKey: cityKeys.detail(id),
        queryFn: async () => {
            if (id === undefined) {
                throw new Error("City id is required");
            }

            return getCity(id);
        },
        enabled: id !== undefined && options?.enabled !== false,
    });
}
