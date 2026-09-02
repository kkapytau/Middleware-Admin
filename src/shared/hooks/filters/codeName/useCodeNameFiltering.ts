import { useMemo } from "react";

import type { CodeNameFilters } from "@/shared/types/filters.ts";

export function useCodeNameFiltering<T extends CodeNameFilters>(
    items: T[],
    filters: CodeNameFilters,
) {
    return useMemo(() => {
        const code = filters.code.trim().toLowerCase();
        const name = filters.name.trim().toLowerCase();

        if (!code && !name) {
            return [];
        }

        return items.filter((item) => {
            const matchesCode = !code || item.code.toLowerCase().includes(code);

            const matchesName = !name || item.name.toLowerCase().includes(name);

            return matchesCode && matchesName;
        });
    }, [items, filters]);
}
