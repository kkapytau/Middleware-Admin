import { useMutation } from "@tanstack/react-query";

import { downloadTimezones } from "../api";

export function useDownloadTimezones() {
    return useMutation({
        mutationFn: downloadTimezones,
    });
}
