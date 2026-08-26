import { useQuery } from "@tanstack/react-query";

import { QUERY_STALE_TIME } from "@/shared/constants/query.ts";

import { countryKeys, getCountries, getCountry } from "../api";

export function useCountries(page: number, size: number) {
    return useQuery({
        queryKey: [...countryKeys.lists(), page, size],
        queryFn: () => getCountries(page, size),
        staleTime: QUERY_STALE_TIME,
    });
}

export function useCountry(id: number | null) {
    return useQuery({
        queryKey: countryKeys.detail(id as number),
        queryFn: () => getCountry(id as number),
        enabled: id !== null,
    });
}
