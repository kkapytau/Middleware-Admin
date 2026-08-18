export const flowFunctionKeys = {
    all: ["flowFunctions"] as const,

    lists: () => [...flowFunctionKeys.all, "list"] as const,

    detail: (id: number | null) => [...flowFunctionKeys.all, "detail", id] as const,
};
