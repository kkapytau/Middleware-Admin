import { useQuery } from "@tanstack/react-query";

import { OPTIONS_STALE_TIME } from "@/shared/constants";

import { getAllTimezones, timezoneKeys } from "../api";

export function useAllTimezones(enabled = true) {
    return useQuery({
        queryKey: timezoneKeys.options(),

        queryFn: getAllTimezones,

        staleTime: OPTIONS_STALE_TIME,

        enabled,
    });
}
