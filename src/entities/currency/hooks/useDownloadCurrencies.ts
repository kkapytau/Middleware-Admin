import { useMutation } from "@tanstack/react-query";

import { downloadCurrencies } from "../api";

export function useDownloadCurrencies() {
    return useMutation({
        mutationFn: downloadCurrencies,
    });
}
