import type { resources } from "@/app/i18n/resources";

export type AppTranslationKey = keyof (typeof resources)["en"]["app"];
