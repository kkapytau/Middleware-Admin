import { useQuery } from "@tanstack/react-query";

import { QUERY_STALE_TIME } from "@/shared/constants/query";

import { cityKeys, getCities } from "../api";

export function useCities() {
    return useQuery({
        queryKey: cityKeys.all,
        queryFn: getCities,
        staleTime: QUERY_STALE_TIME,
    });
}
