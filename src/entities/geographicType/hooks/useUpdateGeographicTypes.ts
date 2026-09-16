import { useMutation, useQueryClient } from "@tanstack/react-query";

import { geographicTypeKeys, updateGeographicType } from "../api";

export function useUpdateGeographicType() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateGeographicType,

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: geographicTypeKeys.all,
            });
        },
    });
}
