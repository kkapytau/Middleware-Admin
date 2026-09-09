import { useMutation } from "@tanstack/react-query";

import { downloadAirports } from "../api";

export function useDownloadAirports() {
    return useMutation({
        mutationFn: downloadAirports,
    });
}
