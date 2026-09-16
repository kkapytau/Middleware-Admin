import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import { OPTIONS_STALE_TIME } from "@/shared/constants";

import { geographicTypeKeys, getAllGeographicTypes } from "../api";

export function useAllGeographicTypes(enabled = true) {
    const { i18n } = useTranslation();

    return useQuery({
        queryKey: geographicTypeKeys.options(i18n.language),
        queryFn: () => getAllGeographicTypes(i18n.language),
        staleTime: OPTIONS_STALE_TIME,
        enabled,
    });
}
