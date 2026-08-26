import type { SetURLSearchParams } from "react-router";

export const updateSearchParams = (
    setSearchParams: SetURLSearchParams,
    updates: Record<string, string | null>,
) => {
    setSearchParams((currentParams) => {
        const nextParams = new URLSearchParams(currentParams);

        Object.entries(updates).forEach(([key, value]) => {
            if (value === null) {
                nextParams.delete(key);
            } else {
                nextParams.set(key, value);
            }
        });

        return nextParams;
    });
};
