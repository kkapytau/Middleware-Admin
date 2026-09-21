export interface Timezone {
    id: number;
    code: string;
    utcOffset: string;
    disabled: boolean;
}

export interface TimezoneDetail {
    id: number;
    code: string;
    utcOffset: string;
    disabled: boolean;
}

export interface TimezoneFormValues {
    code: string;
    utcOffset: string;
    disabled: boolean;
}

export const defaultTimezoneFormValues: TimezoneFormValues = {
    code: "",
    utcOffset: "+00:00",
    disabled: false,
};
