import type { LocaleFormValues } from "@/entities/locale";

export interface Locale {
    id: number;
    code: string;
    name: string;
    deleted: boolean;
}

export const defaultLocaleFormValues: LocaleFormValues = {
    code: "",
    name: "",
    deleted: false,
};
