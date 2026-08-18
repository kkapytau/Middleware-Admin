import { useQuery } from "@tanstack/react-query";

import { countryKeys, getCountries, getCountry } from "../api";

export function useCountries() {
    return useQuery({
        queryKey: countryKeys.lists(),
        queryFn: getCountries,
    });
}

export function useCountry(id: number | null) {
    return useQuery({
        queryKey: countryKeys.detail(id as number),
        queryFn: () => getCountry(id as number),
        enabled: id !== null,
    });
}
