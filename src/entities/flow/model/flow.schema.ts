import { z } from "zod";

import type { FlowFormValues } from "@/entities/flow";

export interface FlowValidationMessages {
    required: string;
    flowCodeMinLength: string;
    flowCodeMaxLength: string;
    flowNameMaxLength: string;
}

export function createFlowFormSchema(messages: FlowValidationMessages) {
    return z.object({
        code: z
            .string()
            .trim()
            .min(1, messages.required)
            .min(3, messages.flowCodeMinLength)
            .max(50, messages.flowCodeMaxLength),

        name: z.string().trim().min(1, messages.required).max(100, messages.flowNameMaxLength),
    });
}

export const defaultFlowFormValues: FlowFormValues = {
    code: "",
    name: "",
};
