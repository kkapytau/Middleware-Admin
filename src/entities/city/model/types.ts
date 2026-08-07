import type { Country } from "@/entities/country";

export interface City {
    cityCode: string;

    cityName: string;

    country: Country;
}
