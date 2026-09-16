import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import { OPTIONS_STALE_TIME } from "@/shared/constants";

import { countryKeys, getAllCountries } from "../api";

interface UseAllCountriesOptions {
    enabled?: boolean;
    isCountry?: boolean;
    isMarket?: boolean;
}

export function useAllCountries({
    enabled = true,
    isCountry,
    isMarket,
}: UseAllCountriesOptions = {}) {
    const { i18n } = useTranslation();

    return useQuery({
        queryKey: countryKeys.options(i18n.language, isCountry, isMarket),
        queryFn: () => getAllCountries(i18n.language, isCountry, isMarket),
        staleTime: OPTIONS_STALE_TIME,
        enabled,
    });
}
