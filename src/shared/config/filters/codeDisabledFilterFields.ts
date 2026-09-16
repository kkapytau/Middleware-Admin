import type { FilterFieldConfig } from "@/shared/types";

export const CODE_DISABLED_FILTER_FIELDS: FilterFieldConfig[] = [
    {
        name: "code",
        type: "text",
        labelKey: "columns.code",
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

export const EMPTY_CODE_DISABLED_FILTERS = {
    code: "",
    deleted: undefined,
};
