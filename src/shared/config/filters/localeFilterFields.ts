import type { FilterFieldConfig } from "@/shared/types";

export const LOCALE_FILTER_FIELDS: FilterFieldConfig[] = [
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
        name: "disabled",
        type: "boolean",
        labelKey: "columns.disabled",
        allLabelKey: "filters.all",
        trueLabelKey: "common.yes",
        falseLabelKey: "common.no",
    },
    {
        name: "isRtl",
        type: "boolean",
        labelKey: "columns.isRtl",
        allLabelKey: "filters.all",
        trueLabelKey: "common.yes",
        falseLabelKey: "common.no",
    },
];

export const EMPTY_LOCALE_FILTERS = {
    code: "",
    name: "",
    disabled: undefined,
    isRtl: undefined,
};
