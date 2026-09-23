import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import { OPTIONS_STALE_TIME } from "@/shared/constants";

import { areaKeys, getAllAreas } from "../api";

interface UseAllAreasOptions {
    enabled?: boolean;
    disabled?: boolean;
}

export function useAllAreas({ enabled = true, disabled }: UseAllAreasOptions = {}) {
    const { i18n } = useTranslation();

    return useQuery({
        queryKey: areaKeys.options(i18n.language, disabled),
        queryFn: () => getAllAreas(i18n.language, disabled),
        staleTime: OPTIONS_STALE_TIME,
        enabled,
    });
}
