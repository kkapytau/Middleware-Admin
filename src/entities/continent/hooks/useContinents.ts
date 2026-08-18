import { useQuery } from "@tanstack/react-query";

import { continentKeys, getContinent, getContinents } from "../api";

export function useContinents() {
    return useQuery({
        queryKey: continentKeys.lists(),
        queryFn: getContinents,
    });
}

export function useContinent(id: number | null) {
    return useQuery({
        queryKey: continentKeys.detail(id as number),
        queryFn: () => getContinent(id as number),
        enabled: id !== null,
    });
}
