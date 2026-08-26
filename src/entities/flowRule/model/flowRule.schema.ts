import { z } from "zod";

import type { FlowRuleFormValues } from "@/entities/flowRule";

export interface FlowRuleValidationMessages {
    required: string;
    flowRuleNameMaxLength: string;
}

export function createFlowRuleFormSchema(messages: FlowRuleValidationMessages) {
    return z.object({
        name: z.string().min(1, messages.required).max(255, messages.flowRuleNameMaxLength),

        flowId: z.number().positive(messages.required),

        enabled: z.boolean().optional(),

        config: z.record(z.string(), z.unknown()),
    });
}

export const defaultFlowRuleFormValues: FlowRuleFormValues = {
    name: "",
    flowId: 0,
    enabled: true,
    config: {
        URL: "",
    },
};
