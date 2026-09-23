export const areaKeys = {
    all: ["areas"] as const,
    lists: () => [...areaKeys.all, "list"] as const,
    detail: (id: number | null) => [...areaKeys.all, "detail", id] as const,
    options: (locale: string, disabled?: boolean) =>
        [...areaKeys.all, "options", locale, disabled] as const,
};
