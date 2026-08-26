import { useQuery } from "@tanstack/react-query";

import { QUERY_STALE_TIME } from "@/shared/constants/query";

import { airportKeys, getAirport, getAirports } from "../api";

export function useAirports(page: number, size: number) {
    return useQuery({
        queryKey: [...airportKeys.lists(), page, size],

        queryFn: () => getAirports(page, size),

        staleTime: QUERY_STALE_TIME,
    });
}

export function useAirport(id: number | null) {
    return useQuery({
        queryKey: airportKeys.detail(id),
        queryFn: () => getAirport(id as number),
        enabled: id !== null,
    });
}
