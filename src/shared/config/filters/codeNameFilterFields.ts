import type { CodeNameFilters, FilterFieldConfig } from "@/shared/types";

export const CODE_NAME_FILTER_FIELDS: FilterFieldConfig[] = [
    {
        name: "code",
        type: "text",
        labelKey: "columns.code",
    },
    {
        name: "name",
        type: "text",
        labelKey: "columns.name",
    },
];

export const EMPTY_CODE_NAME_FILTERS: CodeNameFilters = {
    code: "",
    name: "",
};
