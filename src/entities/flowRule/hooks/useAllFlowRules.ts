import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import { OPTIONS_STALE_TIME } from "@/shared/constants";

import { flowRuleKeys, getAllFlowRules } from "../api";

export function useAllFlowRules(enabled = true) {
    const { i18n } = useTranslation();

    return useQuery({
        queryKey: flowRuleKeys.options(i18n.language),
        queryFn: () => getAllFlowRules(i18n.language),
        staleTime: OPTIONS_STALE_TIME,
        enabled,
    });
}
