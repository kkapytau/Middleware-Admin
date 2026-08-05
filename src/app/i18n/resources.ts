import appEn from "./resources/en/app.json";
import commonEn from "./resources/en/common.json";
import appFr from "./resources/fr/app.json";
import commonFr from "./resources/fr/common.json";

export const defaultNS = "common";

export const resources = {
    en: {
        app: appEn,
        common: commonEn,
    },

    fr: {
        app: appFr,
        common: commonFr,
    },
} as const;
