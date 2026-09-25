import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import { OPTIONS_STALE_TIME } from "@/shared/constants";

import { getAllLocales, localeKeys } from "../api";

interface UseAllLocalesOptions {
    enabled?: boolean;
    disabled?: boolean;
}

export function useAllLocales({ enabled = true, disabled }: UseAllLocalesOptions = {}) {
    const { i18n } = useTranslation();

    return useQuery({
        queryKey: localeKeys.options(i18n.language, disabled),
        queryFn: () => getAllLocales(i18n.language, disabled),
        staleTime: OPTIONS_STALE_TIME,
        enabled,
    });
}
