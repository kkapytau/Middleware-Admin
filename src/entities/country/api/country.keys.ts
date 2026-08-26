export const countryKeys = {
    all: ["countries"] as const,
    lists: () => [...countryKeys.all, "list"] as const,
    details: () => [...countryKeys.all, "detail"] as const,
    detail: (id: number) => [...countryKeys.details(), id] as const,
    options: (locale: string) => [...countryKeys.all, "options", locale] as const,
};
