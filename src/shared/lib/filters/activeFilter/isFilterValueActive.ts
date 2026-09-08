import type { FilterFieldConfig, FilterValue } from "@/shared/types";

export function isFilterValueActive<TItem extends object>(
    value: FilterValue,
    field: FilterFieldConfig<TItem>,
): boolean {
    switch (field.type) {
        case "text":
            return typeof value === "string" && value.trim() !== "";

        case "boolean":
            return typeof value === "boolean";
    }
}
