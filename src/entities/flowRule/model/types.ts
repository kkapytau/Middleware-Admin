import type { Flow } from "@/entities/flow";

export interface FlowRule {
    id: number;
    name: string;
    enabled: boolean;
    config: Record<string, unknown>;
    flow: Flow;
}

export interface FlowRuleFormValues {
    name: string;
    flowId: number;
    enabled?: boolean;
    config: Record<string, unknown>;
}
