import { useMutation, useQueryClient } from "@tanstack/react-query";

import { localeKeys, updateLocale } from "../api";

export const useUpdateLocale = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateLocale,

        onSuccess: () => {
            return queryClient.invalidateQueries({
                queryKey: localeKeys.all,
            });
        },
    });
};
