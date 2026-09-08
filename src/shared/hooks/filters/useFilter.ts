import { useMemo } from "react";

import { getFilterValue, getItemFilterValue } from "@/shared/lib";
import { isFilterValueActive } from "@/shared/lib";
import type { FilterFieldConfig, FilterValue } from "@/shared/types";

function matchesFilter<TItem extends object>(
    itemValue: FilterValue,
    filterValue: FilterValue,
    field: FilterFieldConfig<TItem>,
): boolean {
    switch (field.type) {
        case "text": {
            const filter = String(filterValue ?? "")
                .trim()
                .toLowerCase();

            if (!filter) {
                return true;
            }

            return typeof itemValue === "string" && itemValue.toLowerCase().includes(filter);
        }

        case "boolean":
            return itemValue === filterValue;
    }
}

export function useFilter<TItem extends object, TFilters extends object>(
    items: TItem[],
    filters: TFilters,
    fields: FilterFieldConfig<TItem>[],
) {
    return useMemo(() => {
        const activeFields = fields.filter((field) =>
            isFilterValueActive(getFilterValue(filters, field.name), field),
        );

        if (activeFields.length === 0) {
            return [];
        }

        return items.filter((item) =>
            activeFields.every((field) =>
                matchesFilter(
                    getItemFilterValue(item, field),
                    getFilterValue(filters, field.name),
                    field,
                ),
            ),
        );
    }, [items, filters, fields]);
}
