import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import { OPTIONS_STALE_TIME } from "@/shared/constants";

import { countryKeys, getAllCountries } from "../api";

export function useAllCountries(enabled = true) {
    const { i18n } = useTranslation();

    return useQuery({
        queryKey: countryKeys.options(i18n.language),
        queryFn: () => getAllCountries(i18n.language),
        staleTime: OPTIONS_STALE_TIME,
        enabled,
    });
}
