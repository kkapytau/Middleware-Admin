import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import { OPTIONS_STALE_TIME } from "@/shared/constants";

import { geographicTypeKeys, getAllGeographicTypes } from "../api";

interface UseAllGeographicTypesOptions {
    enabled?: boolean;
    disabled?: boolean;
}

export function useAllGeographicTypes({
    enabled = true,
    disabled,
}: UseAllGeographicTypesOptions = {}) {
    const { i18n } = useTranslation();

    return useQuery({
        queryKey: geographicTypeKeys.options(i18n.language, disabled),
        queryFn: () => getAllGeographicTypes(i18n.language, disabled),
        staleTime: OPTIONS_STALE_TIME,
        enabled,
    });
}
