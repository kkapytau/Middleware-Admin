import { useCallback, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { hasActiveFilters as hasAnyValue } from "@/shared/lib/activeFilter/hasActiveFilters";
import { updateSearchParams } from "@/shared/lib/updateSearchParams/updateSearchParams";

export interface UseUrlFiltersOptions<TFilters extends object> {
    emptyFilters: TFilters;
    getFilters: (searchParams: URLSearchParams) => TFilters;
    getSearchParams: (filters: TFilters) => Record<string, string | null>;
}

export function useUrlFilters<TFilters extends object>({
    emptyFilters,
    getFilters,
    getSearchParams,
}: UseUrlFiltersOptions<TFilters>) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [open, setOpen] = useState(false);

    const filters = useMemo(() => getFilters(searchParams), [searchParams, getFilters]);

    const hasActiveFilters = hasAnyValue(filters);

    const activeFiltersCount = Object.values(filters).filter(Boolean).length;

    const shouldLoadAll = open || hasActiveFilters;

    const handleChange = useCallback(
        (nextFilters: TFilters) => {
            updateSearchParams(setSearchParams, {
                page: "1",
                ...getSearchParams(nextFilters),
            });
        },
        [getSearchParams, setSearchParams],
    );

    const handleReset = useCallback(() => {
        updateSearchParams(setSearchParams, {
            page: "1",
            ...getSearchParams(emptyFilters),
        });
    }, [emptyFilters, getSearchParams, setSearchParams]);

    return {
        filters,
        hasActiveFilters,
        activeFiltersCount,
        shouldLoadAll,
        open,
        setOpen,
        handleChange,
        handleReset,
    };
}
