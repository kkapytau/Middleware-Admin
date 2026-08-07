import type { Continent } from "@/entities/continent";

export interface Country {
    countryCode: string;

    countryName: string;

    continent: Continent;
}
