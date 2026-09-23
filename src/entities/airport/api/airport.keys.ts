export const airportKeys = {
    all: ["airports"] as const,

    lists: () => [...airportKeys.all, "list"] as const,

    detail: (id: number | null) => [...airportKeys.all, "detail", id] as const,

    options: (locale: string, disabled?: boolean) =>
        [...airportKeys.all, "options", locale, disabled] as const,
};
