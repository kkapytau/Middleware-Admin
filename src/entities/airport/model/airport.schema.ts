import { z } from "zod";

interface AirportValidationMessages {
    required: string;

    airportCodeLength: string;

    latitudeRange: string;

    longitudeRange: string;
}

export function createAirportFormSchema(messages: AirportValidationMessages) {
    return z.object({
        code: z
            .string({
                error: messages.required,
            })
            .trim()
            .min(1, messages.required)
            .length(3, messages.airportCodeLength),

        name: z
            .string({
                error: messages.required,
            })
            .trim()
            .min(1, messages.required),

        cityId: z.number().positive(messages.required),

        latitude: z
            .number({
                error: messages.required,
            })
            .min(-90, messages.latitudeRange)
            .max(90, messages.latitudeRange),

        longitude: z
            .number({
                error: messages.required,
            })
            .min(-180, messages.longitudeRange)
            .max(180, messages.longitudeRange),

        translations: z.array(
            z.object({
                language: z.string(),
                value: z.string(),
            }),
        ),
    });
}
