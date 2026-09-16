import { useQuery } from "@tanstack/react-query";

import { QUERY_STALE_TIME } from "@/shared/constants";

import { currencyKeys, getCurrencies, getCurrency } from "../api";

export function useCurrencies(page: number, size: number, deleted?: boolean) {
    return useQuery({
        queryKey: [...currencyKeys.lists(), page, size, deleted],

        queryFn: () => getCurrencies(page, size, deleted),

        staleTime: QUERY_STALE_TIME,
    });
}

export function useCurrency(id: number | null) {
    return useQuery({
        queryKey: currencyKeys.detail(id),

        queryFn: () => getCurrency(id as number),

        enabled: id !== null,
    });
}
