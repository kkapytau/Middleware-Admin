import { useMutation } from "@tanstack/react-query";

import { downloadMarketGroups } from "../api";

export function useDownloadMarketGroups() {
    return useMutation({
        mutationFn: downloadMarketGroups,
    });
}
