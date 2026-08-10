import { useQuery } from "@tanstack/react-query";

import { QUERY_STALE_TIME } from "@/shared/constants/query";

import { airportKeys, getAirports } from "../api";

export function useAirports() {
    return useQuery({
        queryKey: airportKeys.all,

        queryFn: getAirports,

        staleTime: QUERY_STALE_TIME,
    });
}
