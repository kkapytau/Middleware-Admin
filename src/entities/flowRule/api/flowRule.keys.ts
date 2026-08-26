export const flowRuleKeys = {
    all: ["flowRules"] as const,

    lists: () => [...flowRuleKeys.all, "list"] as const,

    detail: (id: number | null) => [...flowRuleKeys.all, "detail", id] as const,
    options: (locale: string) => [...flowRuleKeys.all, "options", locale] as const,
};
