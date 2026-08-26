export const cityKeys = {
    all: ["cities"] as const,
    lists: () => [...cityKeys.all, "list"] as const,
    detail: (id: number | undefined) => [...cityKeys.all, "detail", id] as const,
    options: (locale: string) => [...cityKeys.all, "options", locale] as const,
};
