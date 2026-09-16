import { useMutation } from "@tanstack/react-query";

import { downloadAreas } from "../api";

export function useDownloadAreas() {
    return useMutation({
        mutationFn: downloadAreas,
    });
}
