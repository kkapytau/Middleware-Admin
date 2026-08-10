import { z } from "zod";

export function requiredNumber(
    requiredMessage: string,
    rangeMessage: string,
    min: number,
    max: number,
) {
    return z
        .string()
        .trim()
        .min(1, requiredMessage)
        .transform(Number)
        .pipe(z.number().min(min, rangeMessage).max(max, rangeMessage));
}
