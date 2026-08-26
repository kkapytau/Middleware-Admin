export const flowKeys = {
    all: ["flows"] as const,

    lists: () => [...flowKeys.all, "list"] as const,

    detail: (id: number | null) => [...flowKeys.all, "detail", id] as const,

    options: (locale: string) => [...flowKeys.all, "options", locale] as const,
};
