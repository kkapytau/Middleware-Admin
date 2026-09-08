import { getFilterValueFromSearchParams } from "@/shared/lib";
import type { FilterFieldConfig } from "@/shared/types";

export function getFiltersFromSearchParams<TItem extends object, TFilters extends object>(
    searchParams: URLSearchParams,
    fields: FilterFieldConfig<TItem>[],
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
