import type { Airport } from "@/entities/airport";
import type { FilterFieldConfig } from "@/shared/types";

export const AIRPORT_FILTER_FIELDS: FilterFieldConfig<Airport>[] = [
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

export const EMPTY_AIRPORT_FILTERS = {
    code: "",
    name: "",
    deleted: undefined,
};
