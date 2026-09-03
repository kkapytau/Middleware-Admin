import type { FilterFieldConfig, FilterValue } from "@/shared/types";

export function isFilterValueActive(value: FilterValue, field: FilterFieldConfig): boolean {
    switch (field.type) {
        case "text":
            return typeof value === "string" && value.trim() !== "";

        case "boolean":
            return typeof value === "boolean";
    }
}
