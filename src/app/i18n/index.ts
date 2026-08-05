import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import { namespaces } from "./namespaces";
import { defaultNS, resources } from "./resources";

void i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,

        defaultNS,

        fallbackLng: "en",

        ns: namespaces,

        interpolation: {
            escapeValue: false,
        },
    })
    .catch((error) => {
        console.error("Failed to initialize i18n", error);
    });

export default i18n;
