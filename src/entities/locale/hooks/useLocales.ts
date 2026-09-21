import { useQuery } from "@tanstack/react-query";

import { QUERY_STALE_TIME } from "@/shared/constants";

import { getLocale, getLocales, localeKeys } from "../api";

export function useLocales(page: number, size: number, disabled?: boolean) {
    return useQuery({
        queryKey: [...localeKeys.lists(), page, size, disabled],
        queryFn: () => getLocales(page, size, disabled),
        staleTime: QUERY_STALE_TIME,
    });
}

export const useLocale = (id: number) =>
    useQuery({
        queryKey: localeKeys.detail(id),
        queryFn: () => getLocale(id),
        enabled: Boolean(id),
    });
