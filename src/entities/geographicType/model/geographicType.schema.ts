import { z } from "zod";

export interface GeographicTypeValidationMessages {
    required: string;
    geographicTypeCodePattern: string;
}

export function createGeographicTypeFormSchema(messages: GeographicTypeValidationMessages) {
    return z.object({
        code: z.string().regex(/^[A-Z0-9][A-Z0-9 _-]{0,49}$/, messages.geographicTypeCodePattern),
        disabled: z.boolean(),
    });
}
