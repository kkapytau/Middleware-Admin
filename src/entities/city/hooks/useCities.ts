import { useQuery } from "@tanstack/react-query";

import { QUERY_STALE_TIME } from "@/shared/constants";

import { cityKeys, getCities, getCity } from "../api";

export function useCities(page: number, size: number) {
    return useQuery({
        queryKey: [...cityKeys.lists(), page, size],
        queryFn: () => getCities(page, size),
        staleTime: QUERY_STALE_TIME,
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
