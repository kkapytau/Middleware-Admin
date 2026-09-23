import { z } from "zod";

export interface CountryValidationMessages {
    required: string;
    codePattern: string;
    codeNumericPattern: string;
}

export function createCountryFormSchema(messages: CountryValidationMessages) {
    return z
        .object({
            code: z.string().regex(/^[A-Z]{2,3}$/, messages.codePattern),

            codeNumeric: z
                .string()
                .regex(/^[0-9]{3}$/, messages.codeNumericPattern)
                .or(z.literal("")),

            name: z.string().min(1, messages.required).max(100),

            currencyId: z.number().positive(messages.required).nullable(),

            marketGroupId: z.number().positive(messages.required).nullable(),

            isCountry: z.boolean(),

            isMarket: z.boolean(),

            translations: z.array(
                z.object({
                    language: z.string(),
                    value: z.string(),
                }),
            ),
        })
        .superRefine((values, ctx) => {
            if (values.isCountry) {
                if (!values.codeNumeric) {
                    ctx.addIssue({
                        code: "custom",
                        path: ["codeNumeric"],
                        message: messages.required,
                    });
                }

                if (values.currencyId === null) {
                    ctx.addIssue({
                        code: "custom",
                        path: ["currencyId"],
                        message: messages.required,
                    });
                }
            }

            if (values.isMarket && values.marketGroupId === null) {
                ctx.addIssue({
                    code: "custom",
                    path: ["marketGroupId"],
                    message: messages.required,
                });
            }
        });
}
