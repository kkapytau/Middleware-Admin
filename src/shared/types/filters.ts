import type { AppTranslationKey } from "@/app/i18n/resources";

export interface CodeNameFilters {
    code: string;
    name: string;
}

export type FilterValue = string | boolean | undefined;

interface TextFilterFieldConfig {
    name: string;
    type: "text";
    labelKey: AppTranslationKey;
    placeholderKey?: AppTranslationKey;
}

interface BooleanFilterFieldConfig {
    name: string;
    type: "boolean";
    labelKey: AppTranslationKey;
    allLabelKey: AppTranslationKey;
    trueLabelKey: AppTranslationKey;
    falseLabelKey: AppTranslationKey;
}

export type FilterFieldConfig = TextFilterFieldConfig | BooleanFilterFieldConfig;
