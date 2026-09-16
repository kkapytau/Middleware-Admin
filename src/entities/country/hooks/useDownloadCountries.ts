import { useMutation } from "@tanstack/react-query";

import { downloadCountries } from "../api";

export function useDownloadCountries() {
    return useMutation({
        mutationFn: downloadCountries,
    });
}
