import { useQuery } from "@tanstack/react-query";

import { getFlows } from "../api";

export const flowKeys = {
    all: ["flows"] as const,

    lists: () => [...flowKeys.all, "list"] as const,

    detail: (id: number | null) => [...flowKeys.all, "detail", id] as const,
};

export function useFlows() {
    return useQuery({
        queryKey: flowKeys.lists(),
        queryFn: getFlows,
    });
}
