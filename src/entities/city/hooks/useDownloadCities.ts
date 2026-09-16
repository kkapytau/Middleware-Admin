import { useMutation } from "@tanstack/react-query";

import { downloadCities } from "../api";

export function useDownloadCities() {
    return useMutation({
        mutationFn: downloadCities,
    });
}
