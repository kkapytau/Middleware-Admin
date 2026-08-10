import { z } from "zod";

interface AirportValidationMessages {
    required: string;

    airportCodeLength: string;

    latitudeRange: string;

    longitudeRange: string;
}

export function createAirportFormSchema(messages: AirportValidationMessages) {
    return z.object({
        airportCode: z
            .string()
            .trim()
            .min(1, messages.required)
            .length(3, messages.airportCodeLength),

        airportName: z.string().trim().min(1, messages.required),

        cityId: z.string().min(1, messages.required),

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

        isMetropolitan: z.boolean(),
    });
}

export type AirportFormValues = z.infer<ReturnType<typeof createAirportFormSchema>>;

export const defaultAirportFormValues: AirportFormValues = {
    airportCode: "",
    airportName: "",
    cityId: "",
    latitude: 0,
    longitude: 0,
    isMetropolitan: false,
};
