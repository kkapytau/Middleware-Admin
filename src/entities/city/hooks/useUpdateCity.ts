import { useMutation, useQueryClient } from "@tanstack/react-query";

import { cityKeys, updateCity } from "../api";

export function useUpdateCity() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateCity,
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: cityKeys.all,
            });
        },
    });
}
