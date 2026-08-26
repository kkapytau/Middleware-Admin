export const flowFunctionKeys = {
    all: ["flowFunctions"] as const,

    lists: () => [...flowFunctionKeys.all, "list"] as const,

    detail: (id: number | null) => [...flowFunctionKeys.all, "detail", id] as const,

    options: (locale: string) => [...flowFunctionKeys.all, "options", locale] as const,
};
