import { useQuery } from "@tanstack/react-query";

import { QUERY_STALE_TIME } from "@/shared/constants";

import { geographicTypeKeys, getGeographicType, getGeographicTypes } from "../api";

export function useGeographicTypes(page: number, size: number, deleted?: boolean) {
    return useQuery({
        queryKey: [...geographicTypeKeys.lists(), page, size, deleted],

        queryFn: () => getGeographicTypes(page, size, deleted),

        staleTime: QUERY_STALE_TIME,
    });
}

export function useGeographicType(id: number | null) {
    return useQuery({
        queryKey: geographicTypeKeys.detail(id),

        queryFn: () => getGeographicType(id as number),

        enabled: id !== null,
    });
}
