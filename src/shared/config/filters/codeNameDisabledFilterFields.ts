import type { FilterFieldConfig } from "@/shared/types";

export const CODE_NAME_DISABLED_FILTER_FIELDS: FilterFieldConfig[] = [
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
    {
        name: "deleted",
        type: "boolean",
        labelKey: "columns.deleted",
        allLabelKey: "filters.all",
        trueLabelKey: "common.yes",
        falseLabelKey: "common.no",
    },
];

export const EMPTY_CODE_NAME_DISABLED_FILTERS = {
    code: "",
    name: "",
    deleted: undefined,
};
