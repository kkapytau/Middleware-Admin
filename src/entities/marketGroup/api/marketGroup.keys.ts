export const marketGroupKeys = {
    all: ["market-groups"] as const,

    lists: () => [...marketGroupKeys.all, "list"] as const,

    detail: (id: number | null) => [...marketGroupKeys.all, "detail", id] as const,

    options: (locale: string, disabled?: boolean) =>
        [...marketGroupKeys.all, "options", locale, disabled] as const,
};
