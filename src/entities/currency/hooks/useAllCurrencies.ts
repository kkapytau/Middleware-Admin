import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import { OPTIONS_STALE_TIME } from "@/shared/constants";

import { currencyKeys, getAllCurrencies } from "../api";

export function useAllCurrencies(enabled = true) {
    const { i18n } = useTranslation();

    return useQuery({
        queryKey: currencyKeys.options(i18n.language),
        queryFn: () => getAllCurrencies(i18n.language),
        staleTime: OPTIONS_STALE_TIME,
        enabled,
    });
}
