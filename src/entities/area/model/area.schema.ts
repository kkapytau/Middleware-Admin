import { z } from "zod";

export interface AreaValidationMessages {
    required: string;
    areaCodePattern: string;
}

export function createAreaFormSchema(messages: AreaValidationMessages) {
    return z.object({
        code: z.string().regex(/^[A-Z0-9]{1,10}$/, messages.areaCodePattern),

        name: z.string().min(1, messages.required).max(100),

        geographicTypeId: z.number().int().positive(messages.required),

        parentId: z.number().int().positive().optional(),

        translations: z.array(
            z.object({
                language: z.string(),
                value: z.string(),
            }),
        ),

        disabled: z.boolean(),
    });
}
