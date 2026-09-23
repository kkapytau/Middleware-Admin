import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import { OPTIONS_STALE_TIME } from "@/shared/constants";

import { currencyKeys, getAllCurrencies } from "../api";

interface UseAllCurrenciesOptions {
    enabled?: boolean;
    disabled?: boolean;
}

export function useAllCurrencies({ enabled = true, disabled }: UseAllCurrenciesOptions = {}) {
    const { i18n } = useTranslation();

    return useQuery({
        queryKey: currencyKeys.options(i18n.language, disabled),
        queryFn: () => getAllCurrencies(i18n.language, disabled),
        staleTime: OPTIONS_STALE_TIME,
        enabled,
    });
}
