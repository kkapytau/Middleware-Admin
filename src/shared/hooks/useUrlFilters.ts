import { useCallback, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import {
    getActiveFiltersCount,
    getFiltersFromSearchParams,
    getSearchParamsFromFilters,
} from "@/shared/lib";
import { updateSearchParams } from "@/shared/lib";
import type { FilterFieldConfig } from "@/shared/types";

export interface UseUrlFiltersOptions<TItem extends object, TFilters extends object> {
    emptyFilters: TFilters;
    fields: FilterFieldConfig<TItem>[];
}

export function useUrlFilters<TItem extends object, TFilters extends object>({
    emptyFilters,
    fields,
}: UseUrlFiltersOptions<TItem, TFilters>) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [open, setOpen] = useState(false);

    const filters = useMemo(
        () => getFiltersFromSearchParams(searchParams, fields, emptyFilters),
        [searchParams, fields, emptyFilters],
    );

    const activeFiltersCount = getActiveFiltersCount(filters, fields);

    const hasActiveFilters = activeFiltersCount > 0;

    const shouldLoadAll = open || hasActiveFilters;

    const handleChange = useCallback(
        (nextFilters: TFilters) => {
            updateSearchParams(setSearchParams, {
                page: "1",
                ...getSearchParamsFromFilters(nextFilters, fields),
            });
        },
        [fields, setSearchParams],
    );

    const handleReset = useCallback(() => {
        updateSearchParams(setSearchParams, {
            page: "1",
            ...getSearchParamsFromFilters(emptyFilters, fields),
        });
    }, [emptyFilters, fields, setSearchParams]);

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
