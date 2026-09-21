import { useQuery } from "@tanstack/react-query";

import { QUERY_STALE_TIME } from "@/shared/constants";

import { getMarketGroup, getMarketGroups, marketGroupKeys } from "../api";

export function useMarketGroups(page: number, size: number, disabled?: boolean) {
    return useQuery({
        queryKey: [...marketGroupKeys.lists(), page, size, disabled],
        queryFn: () => getMarketGroups(page, size, disabled),
        staleTime: QUERY_STALE_TIME,
    });
}

export function useMarketGroup(id: number | null) {
    return useQuery({
        queryKey: marketGroupKeys.detail(id),
        queryFn: () => getMarketGroup(id as number),
        enabled: id !== null,
    });
}
