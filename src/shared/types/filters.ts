import type { AppTranslationKey } from "@/app/i18n/resources";

export interface CodeNameFilters {
    code: string;
    name: string;
}

export interface FlowRuleFilters {
    name: string;
    flowName: string;
    enabled: boolean | undefined;
}

export type FilterValue = string | boolean | undefined;

interface TextFilterFieldConfig<TItem = object> {
    name: string;
    type: "text";
    labelKey: AppTranslationKey;
    placeholderKey?: AppTranslationKey;
    getValue?: (item: TItem) => string;
}

interface BooleanFilterFieldConfig<TItem = object> {
    name: string;
    type: "boolean";
    labelKey: AppTranslationKey;
    allLabelKey: AppTranslationKey;
    trueLabelKey: AppTranslationKey;
    falseLabelKey: AppTranslationKey;
    getValue?: (item: TItem) => boolean;
}

export type FilterFieldConfig<TItem = object> =
    TextFilterFieldConfig<TItem> | BooleanFilterFieldConfig<TItem>;
