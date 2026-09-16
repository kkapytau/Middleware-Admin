import { z } from "zod";

export interface MarketGroupValidationMessages {
    required: string;
    marketGroupCodePattern: string;
}

export function createMarketGroupFormSchema(messages: MarketGroupValidationMessages) {
    return z.object({
        code: z.string().regex(/^[A-Z0-9][A-Z0-9 _-]{0,49}$/, messages.marketGroupCodePattern),
        disabled: z.boolean(),
        translations: z.array(
            z.object({
                language: z.string(),
                value: z.string(),
            }),
        ),
    });
}
