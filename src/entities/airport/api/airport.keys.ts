export const airportKeys = {
    all: ["airports"] as const,

    lists: () => [...airportKeys.all, "list"] as const,

    details: () => [...airportKeys.all, "detail"] as const,

    detail: (code: string) => [...airportKeys.details(), code] as const,
};
