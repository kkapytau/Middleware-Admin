import { z } from "zod";

import type { AirportFormValues } from "@/entities/airport";

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

        cityId: z.number().refine((value) => value !== null, {
            error: messages.required,
        }),

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

        metropolitan: z.boolean(),
    });
}

export const defaultAirportFormValues: AirportFormValues = {
    code: "",
    name: "",
    cityId: 0,
    latitude: 0,
    longitude: 0,
    metropolitan: false,
};
