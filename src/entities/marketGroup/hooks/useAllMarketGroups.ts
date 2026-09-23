import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import { OPTIONS_STALE_TIME } from "@/shared/constants";

import { getAllMarketGroups, marketGroupKeys } from "../api";

interface UseAllMarketGroupsOptions {
    enabled?: boolean;
    disabled?: boolean;
}

export function useAllMarketGroups({ enabled = true, disabled }: UseAllMarketGroupsOptions = {}) {
    const { i18n } = useTranslation();

    return useQuery({
        queryKey: marketGroupKeys.options(i18n.language, disabled),
        queryFn: () => getAllMarketGroups(i18n.language, disabled),
        staleTime: OPTIONS_STALE_TIME,
        enabled,
    });
}
