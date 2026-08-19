export const cityKeys = {
    all: ["cities"] as const,
    list: () => [...cityKeys.all, "list"] as const,
    detail: (id: number | undefined) => [...cityKeys.all, "detail", id] as const,
};
