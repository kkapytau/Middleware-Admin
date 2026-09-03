import { isFilterValueActive } from "@/shared/lib";
import type { FilterFieldConfig, FilterValue } from "@/shared/types";

export function getFilterValue(filters: object, name: string): FilterValue {
    return (filters as Record<string, FilterValue>)[name];
}

export function getActiveFiltersCount<TFilters extends object>(
    filters: TFilters,
    fields: FilterFieldConfig[],
): number {
    return fields.filter((field) => isFilterValueActive(getFilterValue(filters, field.name), field))
        .length;
}
