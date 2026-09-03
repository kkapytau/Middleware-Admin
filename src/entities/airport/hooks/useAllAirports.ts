import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import { OPTIONS_STALE_TIME } from "@/shared/constants";

import { airportKeys, getAllAirports } from "../api";

export function useAllAirports(enabled = true) {
    const { i18n } = useTranslation();

    return useQuery({
        queryKey: airportKeys.options(i18n.language),
        queryFn: () => getAllAirports(i18n.language),
        staleTime: OPTIONS_STALE_TIME,
        enabled,
    });
}
