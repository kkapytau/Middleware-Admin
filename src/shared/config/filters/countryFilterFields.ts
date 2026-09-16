import type { FilterFieldConfig } from "@/shared/types";

export const COUNTRY_FILTER_FIELDS: FilterFieldConfig[] = [
    {
        name: "code",
        type: "text",
        labelKey: "columns.code",
    },
    {
        name: "codeNumeric",
        type: "text",
        labelKey: "columns.codeNumeric",
    },
    {
        name: "name",
        type: "text",
        labelKey: "columns.name",
    },
    {
        name: "isCountry",
        type: "boolean",
        labelKey: "columns.isCountry",
        allLabelKey: "filters.all",
        trueLabelKey: "common.yes",
        falseLabelKey: "common.no",
    },
    {
        name: "isMarket",
        type: "boolean",
        labelKey: "columns.isMarket",
        allLabelKey: "filters.all",
        trueLabelKey: "common.yes",
        falseLabelKey: "common.no",
    },
];

export const EMPTY_COUNTRY_FILTERS = {
    code: "",
    codeNumeric: "",
    name: "",
    isCountry: "",
    isMarket: "",
};
