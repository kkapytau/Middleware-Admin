import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import { OPTIONS_STALE_TIME } from "@/shared/constants";

import { airportKeys, getAllAirports } from "../api";

interface UseAllAirportsOptions {
    enabled?: boolean;
    disabled?: boolean;
}

export function useAllAirports({ enabled = true, disabled }: UseAllAirportsOptions = {}) {
    const { i18n } = useTranslation();

    return useQuery({
        queryKey: airportKeys.options(i18n.language, disabled),
        queryFn: () => getAllAirports(i18n.language, disabled),
        staleTime: OPTIONS_STALE_TIME,
        enabled,
    });
}
