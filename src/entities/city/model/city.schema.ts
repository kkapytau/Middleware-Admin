import { z } from "zod";

export interface CityValidationMessages {
    required: string;
    cityCodeLength: string;
    cityCodePattern: string;
}

export function createCityFormSchema(messages: CityValidationMessages) {
    return z.object({
        code: z
            .string()
            .length(3, messages.cityCodeLength)
            .regex(/^[A-Z]{3}$/, messages.cityCodePattern),

        name: z.string().min(1, messages.required),

        countryId: z.number().min(1, messages.required),

        translations: z.record(z.string(), z.string()),
    });
}
