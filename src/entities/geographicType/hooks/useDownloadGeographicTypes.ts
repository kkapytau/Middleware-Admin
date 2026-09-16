import { useMutation } from "@tanstack/react-query";

import { downloadGeographicTypes } from "../api";

export function useDownloadGeographicTypes() {
    return useMutation({
        mutationFn: downloadGeographicTypes,
    });
}
