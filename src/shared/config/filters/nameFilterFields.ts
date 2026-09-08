import type { FilterFieldConfig } from "@/shared/types";

export const NAME_FILTER_FIELDS: FilterFieldConfig[] = [
    {
        name: "name",
        type: "text",
        labelKey: "columns.name",
    },
];

export const EMPTY_FUNCTION_FILTERS = {
    name: "",
};
