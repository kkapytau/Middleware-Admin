import appEn from "./resources/en/app.json";
import appFr from "./resources/fr/app.json";

export const defaultNS = "common";

export const resources = {
    en: {
        app: appEn,
    },

    fr: {
        app: appFr,
    },
} as const;

type NestedKeyOf<T> = {
    [K in keyof T & string]: T[K] extends object ? `${K}.${NestedKeyOf<T[K]>}` : K;
}[keyof T & string];

export type AppTranslationKey = NestedKeyOf<(typeof resources)["en"]["app"]>;
