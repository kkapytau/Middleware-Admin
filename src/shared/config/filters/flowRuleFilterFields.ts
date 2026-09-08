import type { FlowRule } from "@/entities/flowRule";
import type { FilterFieldConfig, FlowRuleFilters } from "@/shared/types";

export const FLOW_RULE_FILTER_FIELDS: FilterFieldConfig<FlowRule>[] = [
    {
        name: "name",
        type: "text",
        labelKey: "columns.name",
    },
    {
        name: "flowName",
        type: "text",
        labelKey: "form.flowName",
        getValue: (rule) => rule.flow.name,
    },
    {
        name: "enabled",
        type: "boolean",
        labelKey: "form.enabled",
        allLabelKey: "filters.all",
        trueLabelKey: "common.yes",
        falseLabelKey: "common.no",
    },
];

export const EMPTY_FLOW_RULE_FILTERS: FlowRuleFilters = {
    name: "",
    flowName: "",
    enabled: undefined,
};
