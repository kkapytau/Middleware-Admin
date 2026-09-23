import type { LocaleFormValues } from "@/entities/locale";

export interface Locale {
    id: number;
    code: string;
    name: string;
    disabled: boolean;
    isRtl?: boolean;
}

export const defaultLocaleFormValues: LocaleFormValues = {
    code: "",
    name: "",
    disabled: false,
    isRtl: false,
};
