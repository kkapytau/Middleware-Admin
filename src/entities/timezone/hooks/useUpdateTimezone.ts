import { useMutation, useQueryClient } from "@tanstack/react-query";

import { timezoneKeys, updateTimezone } from "../api";

export function useUpdateTimezone() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateTimezone,

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: timezoneKeys.all,
            });
        },
    });
}
