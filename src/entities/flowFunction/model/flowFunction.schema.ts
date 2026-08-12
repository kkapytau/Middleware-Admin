import { z } from "zod";

import type { FlowFunction } from "./types";

export const flowFunctionFormSchema = z.object({
    name: z.string().trim().min(1, "Function name is required"),

    values: z
        .array(
            z.object({
                key: z.string().trim().min(1, "Key is required"),
                value: z.string().trim().min(1, "Value is required"),
            }),
        )
        .min(1),
});

export type FlowFunctionFormValues = z.infer<typeof flowFunctionFormSchema>;

export const defaultFlowFunctionFormValues: FlowFunctionFormValues = {
    name: "",
    values: [
        {
            key: "",
            value: "",
        },
    ],
};

export function flowFunctionToFormValues(flowFunction: FlowFunction): FlowFunctionFormValues {
    return {
        name: flowFunction.name,
        values: flowFunction.values,
    };
}
