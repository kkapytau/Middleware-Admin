import type { FilterFieldConfig, FilterValue } from "@/shared/types";

export function getFilterValueFromSearchParams(
    searchParams: URLSearchParams,
    field: FilterFieldConfig,
): FilterValue {
    const value = searchParams.get(field.name);

    if (value === null) {
        return undefined;
    }

    switch (field.type) {
        case "text":
            return value;

        case "boolean":
            if (value === "true") {
                return true;
            }

            if (value === "false") {
                return false;
            }

            return undefined;
    }
}
