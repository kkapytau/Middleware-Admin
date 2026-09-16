import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import { OPTIONS_STALE_TIME } from "@/shared/constants";

import { areaKeys, getAllAreas } from "../api";

export function useAllAreas(enabled = true) {
    const { i18n } = useTranslation();

    return useQuery({
        queryKey: areaKeys.options(i18n.language),
        queryFn: () => getAllAreas(i18n.language),
        staleTime: OPTIONS_STALE_TIME,
        enabled,
    });
}
