export const timezoneKeys = {
    all: ["timezones"] as const,

    lists: () => [...timezoneKeys.all, "list"] as const,

    detail: (id: number | null) => [...timezoneKeys.all, "detail", id] as const,

    options: (locale: string, disabled?: boolean) =>
        [...timezoneKeys.all, "options", locale, disabled] as const,
};
