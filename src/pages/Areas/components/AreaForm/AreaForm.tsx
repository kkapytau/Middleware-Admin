import type { Control, UseFormSetValue } from "react-hook-form";
import { useTranslation } from "react-i18next";

import type { AreaFormValues } from "@/entities/area";
import { useAllGeographicTypes } from "@/entities/geographicType";
import { FormInput, FormSelect, FormSwitch } from "@/shared/components/form";
import { TranslationsButton } from "@/shared/components/form/TranslationsButton";
import { TranslationsModal } from "@/shared/components/TranslationsModal";
import { MAX_CODE_LENGTH } from "@/shared/constants";
import { useTranslationsForm } from "@/shared/hooks";

interface AreaFormProps {
    isEditing: boolean;
    entityName: string;
    control: Control<AreaFormValues>;
    setValue: UseFormSetValue<AreaFormValues>;
}

export function AreaForm({ control, setValue, isEditing, entityName }: AreaFormProps) {
    const { t } = useTranslation("app");

    const { data: geographicTypes = [], isLoading: geographicTypesLoading } = useAllGeographicTypes(
        {
            disabled: false,
        },
    );

    const geographicTypeOptions = geographicTypes.map((geographicType) => ({
        value: geographicType.id,
        label: geographicType.code,
    }));

    const {
        translations,
        translationsOpen,
        setTranslationsOpen,
        handleTranslationsDone,
        handleTranslationsCancel,
    } = useTranslationsForm({
        control,
        setValue,
    });

    return (
        <>
            <FormInput
                entityName={entityName}
                control={control}
                name="code"
                label={t("form.code")}
                placeholder={t("form.enterCode")}
                maxLength={MAX_CODE_LENGTH * 5}
                uppercase
            />

            <FormInput
                entityName={entityName}
                control={control}
                name="name"
                label={t("form.name")}
                placeholder={t("form.enterName")}
            />

            <FormSelect
                entityName={entityName}
                control={control}
                name="geographicTypeId"
                label={t("form.geographicType")}
                placeholder={t("form.selectGeographicType")}
                options={geographicTypeOptions}
                loading={geographicTypesLoading}
                showSearch
            />

            {isEditing && (
                <FormSwitch
                    entityName={entityName}
                    control={control}
                    name="disabled"
                    label={t("form.disabled")}
                />
            )}

            <TranslationsButton
                entityName={entityName}
                disabled={false}
                onClick={() => setTranslationsOpen(true)}
            ></TranslationsButton>

            <TranslationsModal
                entityName={entityName}
                key={translationsOpen ? "open" : "closed"}
                open={translationsOpen}
                value={translations ?? []}
                onDone={handleTranslationsDone}
                onCancel={handleTranslationsCancel}
            />
        </>
    );
}
