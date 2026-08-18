export const continentKeys = {
    all: ["continents"] as const,
    lists: () => [...continentKeys.all, "list"] as const,
    details: () => [...continentKeys.all, "detail"] as const,
    detail: (id: number) => [...continentKeys.details(), id] as const,
};
