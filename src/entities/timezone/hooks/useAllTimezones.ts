import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import { OPTIONS_STALE_TIME } from "@/shared/constants";

import { getAllTimezones, timezoneKeys } from "../api";

interface UseAllTimezonesOptions {
    enabled?: boolean;
    disabled?: boolean;
}

export function useAllTimezones({ enabled = true, disabled }: UseAllTimezonesOptions = {}) {
    const { i18n } = useTranslation();

    return useQuery({
        queryKey: timezoneKeys.options(i18n.language, disabled),

        queryFn: () => getAllTimezones(i18n.language, disabled),

        staleTime: OPTIONS_STALE_TIME,

        enabled,
    });
}
