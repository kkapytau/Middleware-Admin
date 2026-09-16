import { useMutation, useQueryClient } from "@tanstack/react-query";

import { areaKeys, updateArea } from "../api";

export function useUpdateArea() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateArea,
        onSuccess: () => {
            return queryClient.invalidateQueries({
                queryKey: areaKeys.all,
            });
        },
    });
}
