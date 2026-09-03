import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import { OPTIONS_STALE_TIME } from "@/shared/constants";

import { cityKeys, getAllCities } from "../api";

export function useAllCities(enabled = true) {
    const { i18n } = useTranslation();

    return useQuery({
        queryKey: cityKeys.options(i18n.language),
        queryFn: () => getAllCities(i18n.language),
        staleTime: OPTIONS_STALE_TIME,
        enabled,
    });
}
