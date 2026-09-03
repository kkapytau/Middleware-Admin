import { getFilterValueFromSearchParams } from "@/shared/lib";
import type { FilterFieldConfig } from "@/shared/types";

export function getFiltersFromSearchParams<TFilters extends object>(
    searchParams: URLSearchParams,
    fields: FilterFieldConfig[],
    emptyFilters: TFilters,
): TFilters {
    return fields.reduce(
        (filters, field) => ({
            ...filters,
            [field.name]: getFilterValueFromSearchParams(searchParams, field),
        }),
        emptyFilters,
    );
}
