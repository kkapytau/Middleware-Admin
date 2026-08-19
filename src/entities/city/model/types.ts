export interface City {
    id: number;
    code: string;
    name: string;
}

export interface CityDetail {
    id: number;
    code: string;
    name: string;
    translations: Record<string, string>;
    country: {
        id: number;
        code: string;
        name: string;
        translations: Record<string, string>;
    };
}

export interface CityFormValues {
    code: string;
    name: string;
    countryId: number;
    translations: Record<string, string>;
}

export const defaultCityFormValues: CityFormValues = {
    code: "",
    name: "",
    countryId: 0,
    translations: {},
};
