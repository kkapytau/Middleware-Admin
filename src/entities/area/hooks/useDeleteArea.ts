import { useMutation, useQueryClient } from "@tanstack/react-query";

import { areaKeys, deleteArea } from "../api";

export function useDeleteArea() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => deleteArea(id),
        onSuccess: () => {
            return queryClient.invalidateQueries({
                queryKey: areaKeys.all,
            });
        },
    });
}
