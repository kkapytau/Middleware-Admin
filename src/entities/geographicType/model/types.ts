export interface GeographicType {
    id: number;
    code: string;
    deleted: boolean;
}

export interface GeographicTypeFormValues {
    code: string;
    deleted: boolean;
}

export const defaultGeographicTypeFormValues: GeographicTypeFormValues = {
    code: "",
    deleted: false,
};
