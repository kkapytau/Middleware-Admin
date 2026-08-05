import "i18next";

import { defaultNS, resources } from "../app/i18n/resources";

declare module "i18next" {
    interface CustomTypeOptions {
        defaultNS: typeof defaultNS;

        resources: (typeof resources)["en"];

        strictKeyChecks: true;
    }
}
