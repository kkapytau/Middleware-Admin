export interface ContinentFormValues {
    code: string;
    name: string;
    translations: Record<string, string>;
}

export const defaultContinentFormValues: ContinentFormValues = {
    code: "",
    name: "",
    translations: {},
};
