export interface GeographicType {
    id: number;
    code: string;
    disabled: boolean;
}

export interface GeographicTypeFormValues {
    code: string;
    disabled: boolean;
}

export const defaultGeographicTypeFormValues: GeographicTypeFormValues = {
    code: "",
    disabled: false,
};
