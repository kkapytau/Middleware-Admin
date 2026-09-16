import { useQuery } from "@tanstack/react-query";

import { QUERY_STALE_TIME } from "@/shared/constants";

import { areaKeys, getArea, getAreas } from "../api";

export function useAreas(page: number, size: number, deleted?: boolean) {
    return useQuery({
        queryKey: [...areaKeys.lists(), page, size, deleted],
        queryFn: () => getAreas(page, size, deleted),
        staleTime: QUERY_STALE_TIME,
    });
}

export function useArea(id: number | null) {
    return useQuery({
        queryKey: areaKeys.detail(id as number),
        queryFn: () => getArea(id as number),
        enabled: id !== null,
    });
}
