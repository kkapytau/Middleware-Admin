import { useCallback } from "react";

import { useUrlFilters } from "@/shared/hooks";
import type { CodeNameFilters } from "@/shared/types/filters";

export const EMPTY_CODE_NAME_FILTERS: CodeNameFilters = {
    code: "",
    name: "",
};

export function useCodeNameFilters() {
    const getFilters = useCallback(
        (searchParams: URLSearchParams): CodeNameFilters => ({
            code: searchParams.get("code") ?? "",
            name: searchParams.get("name") ?? "",
        }),
        [],
    );

    const getSearchParams = useCallback(
        (filters: CodeNameFilters) => ({
            code: filters.code.trim() || null,
            name: filters.name.trim() || null,
        }),
        [],
    );

    return useUrlFilters({
        emptyFilters: EMPTY_CODE_NAME_FILTERS,
        getFilters,
        getSearchParams,
    });
}
