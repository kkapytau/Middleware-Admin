export const timezoneKeys = {
    all: ["timezones"] as const,

    lists: () => [...timezoneKeys.all, "list"] as const,

    detail: (id: number | null) => [...timezoneKeys.all, "detail", id] as const,

    options: () => [...timezoneKeys.all, "options"] as const,
};
