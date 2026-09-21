import { useQuery } from "@tanstack/react-query";

import { QUERY_STALE_TIME } from "@/shared/constants";

import { getTimezone, getTimezones, timezoneKeys } from "../api";

export function useTimezones(page: number, size: number, disabled?: boolean) {
    return useQuery({
        queryKey: [...timezoneKeys.lists(), page, size, disabled],

        queryFn: () => getTimezones(page, size, disabled),

        staleTime: QUERY_STALE_TIME,
    });
}
export function useTimezone(id: number | null) {
    return useQuery({
        queryKey: timezoneKeys.detail(id),

        queryFn: () => getTimezone(id as number),

        staleTime: QUERY_STALE_TIME,

        enabled: id !== null,
    });
}
