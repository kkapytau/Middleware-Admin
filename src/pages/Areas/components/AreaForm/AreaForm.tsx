import { Button, Flex } from "antd";
import type { Control, UseFormSetValue } from "react-hook-form";
import { useTranslation } from "react-i18next";

import type { AreaFormValues } from "@/entities/area";
import { useAllGeographicTypes } from "@/entities/geographicType";
import { FormInput, FormSelect, FormSwitch } from "@/shared/components/form";
import { TranslationsModal } from "@/shared/components/TranslationsModal";
import { MAX_CODE_LENGTH } from "@/shared/constants";
import { useTranslationsForm } from "@/shared/hooks";

interface AreaFormProps {
    isEditing: boolean;
    control: Control<AreaFormValues>;
    setValue: UseFormSetValue<AreaFormValues>;
}

export function AreaForm({ control, setValue, isEditing }: AreaFormProps) {
    const { t } = useTranslation("app");

    const { data: geographicTypes = [], isLoading: geographicTypesLoading } =
        useAllGeographicTypes();

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
                control={control}
                name="code"
                label={t("form.code")}
                placeholder={t("form.enterCode")}
                maxLength={MAX_CODE_LENGTH * 5}
                uppercase
            />

            <FormInput
                control={control}
                name="name"
                label={t("form.name")}
                placeholder={t("form.enterName")}
            />

            <FormSelect
                control={control}
                name="geographicTypeId"
                label={t("form.geographicType")}
                placeholder={t("form.selectGeographicType")}
                options={geographicTypeOptions}
                loading={geographicTypesLoading}
                showSearch
            />

            {isEditing && (
                <FormSwitch control={control} name="deleted" label={t("form.disabled")} />
            )}

            <Flex justify="flex-start">
                <Button type="default" disabled={false} onClick={() => setTranslationsOpen(true)}>
                    🌐 {t("translations.manage")}
                </Button>
            </Flex>

            <TranslationsModal
                key={translationsOpen ? "open" : "closed"}
                open={translationsOpen}
                value={translations ?? []}
                onDone={handleTranslationsDone}
                onCancel={handleTranslationsCancel}
            />
        </>
    );
}
