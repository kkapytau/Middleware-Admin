import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createLocale, localeKeys, type LocaleRequestValues } from "../api";

export const useCreateLocale = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (values: LocaleRequestValues) => createLocale(values),

        onSuccess: () => {
            return queryClient.invalidateQueries({
                queryKey: localeKeys.lists(),
            });
        },
    });
};
