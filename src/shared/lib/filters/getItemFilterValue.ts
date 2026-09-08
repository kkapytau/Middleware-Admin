import type { FilterFieldConfig, FilterValue } from "@/shared/types/filters";

export function getItemFilterValue<TItem extends object>(
    item: TItem,
    field: FilterFieldConfig<TItem>,
): FilterValue {
    if (field.getValue) {
        return field.getValue(item);
    }

    return (item as Record<string, FilterValue>)[field.name];
}
