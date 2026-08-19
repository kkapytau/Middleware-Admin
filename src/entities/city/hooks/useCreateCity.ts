import { useMutation, useQueryClient } from "@tanstack/react-query";

import { cityKeys, createCity } from "../api";

export function useCreateCity() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createCity,
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: cityKeys.all,
            });
        },
    });
}
