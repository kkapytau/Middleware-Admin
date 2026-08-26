import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import { OPTIONS_STALE_TIME } from "@/shared/constants/query";

import { flowKeys, getAllFlows } from "../api";

export function useAllFlows() {
    const { i18n } = useTranslation();

    return useQuery({
        queryKey: flowKeys.options(i18n.language),
        queryFn: () => getAllFlows(i18n.language),
        staleTime: OPTIONS_STALE_TIME,
    });
}
