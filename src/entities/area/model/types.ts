import type { TranslationFormValue } from "@/shared/types";

export interface Area {
    id: number;
    code: string;
    name: string;
    deleted: boolean;
}

export interface AreaDetail extends Area {
    translations: Record<string, string>;
    geographicType: {
        id: number;
        code: string;
        deleted: boolean;
    };
    parent: Area | null;
}

export interface AreaFormValues {
    code: string;
    name: string;
    geographicTypeId: number;
    parentId?: number;
    translations: TranslationFormValue[];
    deleted: boolean;
}

export const defaultAreaFormValues: AreaFormValues = {
    code: "",
    name: "",
    geographicTypeId: 0,
    parentId: undefined,
    translations: [],
    deleted: false,
};
