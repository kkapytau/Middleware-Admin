export const areaKeys = {
    all: ["areas"] as const,
    lists: () => [...areaKeys.all, "list"] as const,
    detail: (id: number | null) => [...areaKeys.all, "detail", id] as const,
    options: (locale: string) => [...areaKeys.all, "options", locale] as const,
};
