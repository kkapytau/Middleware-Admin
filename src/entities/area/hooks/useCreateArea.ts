import { useMutation, useQueryClient } from "@tanstack/react-query";

import { areaKeys, type AreaRequestValues, createArea } from "../api";

export function useCreateArea() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (values: AreaRequestValues) => createArea(values),
        onSuccess: () => {
            return queryClient.invalidateQueries({
                queryKey: areaKeys.all,
            });
        },
    });
}
