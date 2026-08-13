import { z } from "zod";

export interface FlowFunctionValidationMessages {
    functionNameRequired: string;
    keyRequired: string;
    valueRequired: string;
    duplicateKey: string;
}

export function createFlowFunctionFormSchema(messages: FlowFunctionValidationMessages) {
    return z.object({
        name: z.string().trim().min(1, messages.functionNameRequired),

        values: z
            .array(
                z.object({
                    key: z.string().trim().min(1, messages.keyRequired),
                    value: z.string().trim().min(1, messages.valueRequired),
                }),
            )
            .min(1)
            .superRefine((values, ctx) => {
                const keyIndexes = new Map<string, number>();

                values.forEach(({ key }, index) => {
                    const normalizedKey = key.trim();

                    if (!normalizedKey) {
                        return;
                    }

                    const firstIndex = keyIndexes.get(normalizedKey);

                    if (firstIndex !== undefined) {
                        ctx.addIssue({
                            code: "custom",
                            path: [index, "key"],
                            message: messages.duplicateKey,
                        });

                        ctx.addIssue({
                            code: "custom",
                            path: [firstIndex, "key"],
                            message: messages.duplicateKey,
                        });

                        return;
                    }

                    keyIndexes.set(normalizedKey, index);
                });
            }),
    });
}

export type FlowFunctionFormValues = z.infer<ReturnType<typeof createFlowFunctionFormSchema>>;

export const defaultFlowFunctionFormValues: FlowFunctionFormValues = {
    name: "",
    values: [
        {
            key: "",
            value: "",
        },
    ],
};
