export const languages = [
    { code: "en", nativeName: "English" },
    { code: "fr", nativeName: "Français" },
] as const;

export type LanguageCode = (typeof languages)[number]["code"];
