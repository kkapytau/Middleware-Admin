import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteGeographicType, geographicTypeKeys } from "../api";

export function useDeleteGeographicType() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteGeographicType,

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: geographicTypeKeys.all,
            });
        },
    });
}
