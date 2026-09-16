import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import { OPTIONS_STALE_TIME } from "@/shared/constants";

import { getAllMarketGroups, marketGroupKeys } from "../api";

export function useAllMarketGroups(enabled = true) {
    const { i18n } = useTranslation();

    return useQuery({
        queryKey: marketGroupKeys.options(i18n.language),
        queryFn: () => getAllMarketGroups(i18n.language),
        staleTime: OPTIONS_STALE_TIME,
        enabled,
    });
}
