import type { FilterFieldConfig, FilterValue } from "@/shared/types";

export function getSearchParamsFromFilters<TFilters extends object>(
    filters: TFilters,
    fields: FilterFieldConfig[],
): Record<string, string | null> {
    return Object.fromEntries(
        fields.map((field) => {
            const value = (filters as Record<string, FilterValue>)[field.name];

            switch (field.type) {
                case "text":
                    return [field.name, typeof value === "string" ? value.trim() || null : null];

                case "boolean":
                    return [field.name, typeof value === "boolean" ? String(value) : null];
            }
        }),
    );
}
