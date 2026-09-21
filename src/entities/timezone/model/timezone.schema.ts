import { z } from "zod";

interface TimezoneValidationMessages {
    required: string;

    timezoneCodeLength: string;

    timezoneCodeFormat: string;

    utcOffsetFormat: string;
}

export function createTimezoneFormSchema(messages: TimezoneValidationMessages) {
    return z.object({
        code: z
            .string({
                error: messages.required,
            })
            .trim()
            .min(1, messages.required)
            .max(64, messages.timezoneCodeLength)
            .regex(/^[A-Za-z][A-Za-z0-9_+/-]{0,63}$/, messages.timezoneCodeFormat),

        utcOffset: z
            .string({
                error: messages.required,
            })
            .trim()
            .regex(/^[+-](0[0-9]|1[0-4]):[0-5][0-9]$/, messages.utcOffsetFormat),

        disabled: z.boolean(),
    });
}
