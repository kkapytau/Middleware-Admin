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
