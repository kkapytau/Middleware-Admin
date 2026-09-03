import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import { OPTIONS_STALE_TIME } from "@/shared/constants";

import { flowFunctionKeys, getAllFlowFunctions } from "../api";

export function useAllFlowFunctions() {
    const { i18n } = useTranslation();

    return useQuery({
        queryKey: flowFunctionKeys.options(i18n.language),
        queryFn: () => getAllFlowFunctions(i18n.language),
        staleTime: OPTIONS_STALE_TIME,
    });
}
