import type { TranslationFormValue } from "@/shared/types";

export interface Area {
    id: number;
    code: string;
    name: string;
    disabled: boolean;
}

export interface AreaDetail extends Area {
    translations: Record<string, string>;
    geographicType: {
        id: number;
        code: string;
        disabled: boolean;
    };
    parent: Area | null;
}

export interface AreaFormValues {
    code: string;
    name: string;
    geographicTypeId: number;
    parentId?: number;
    translations: TranslationFormValue[];
    disabled: boolean;
}

export const defaultAreaFormValues: AreaFormValues = {
    code: "",
    name: "",
    geographicTypeId: 0,
    parentId: undefined,
    translations: [],
    disabled: false,
};
