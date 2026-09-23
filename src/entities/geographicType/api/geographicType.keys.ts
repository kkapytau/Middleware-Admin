export const geographicTypeKeys = {
    all: ["geographic-types"] as const,

    lists: () => [...geographicTypeKeys.all, "list"] as const,

    detail: (id: number | null) => [...geographicTypeKeys.all, "detail", id] as const,

    options: (locale: string, disabled?: boolean) =>
        [...geographicTypeKeys.all, "options", locale, disabled] as const,
};
