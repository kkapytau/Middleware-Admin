import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createGeographicType, geographicTypeKeys } from "../api";

export function useCreateGeographicType() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createGeographicType,

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: geographicTypeKeys.all,
            });
        },
    });
}
