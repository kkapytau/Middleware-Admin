export const airportKeys = {
    all: ["airports"] as const,

    lists: () => [...airportKeys.all, "list"] as const,

    detail: (id: number | null) => [...airportKeys.all, "detail", id] as const,

    options: (locale: string) => [...airportKeys.all, "options", locale] as const,
};
