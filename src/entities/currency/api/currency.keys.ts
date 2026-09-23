export const currencyKeys = {
    all: ["currencies"] as const,

    lists: () => [...currencyKeys.all, "list"] as const,

    detail: (id: number | null) => [...currencyKeys.all, "detail", id] as const,

    options: (locale: string, disabled?: boolean) =>
        [...currencyKeys.all, "options", locale, disabled] as const,
};
