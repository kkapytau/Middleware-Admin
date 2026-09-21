import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createTimezone, timezoneKeys } from "../api";

export function useCreateTimezone() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createTimezone,

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: timezoneKeys.all,
            });
        },
    });
}
