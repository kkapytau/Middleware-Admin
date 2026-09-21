export const localeKeys = {
    all: ["locales"] as const,

    lists: () => [...localeKeys.all, "list"] as const,

    list: (page: number, size: number, disabled?: boolean) =>
        [...localeKeys.lists(), page, size, disabled] as const,

    details: () => [...localeKeys.all, "detail"] as const,

    detail: (id: number) => [...localeKeys.details(), id] as const,
};
