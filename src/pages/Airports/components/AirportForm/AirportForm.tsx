import type { Control, UseFormSetValue } from "react-hook-form";
import { useTranslation } from "react-i18next";

import type { AirportFormValues } from "@/entities/airport";
import { useAllCities } from "@/entities/city";
import { FormInput, FormNumberInput, FormSelect, FormSwitch } from "@/shared/components/form";
import { TranslationsButton } from "@/shared/components/form/TranslationsButton";
import { TranslationsModal } from "@/shared/components/TranslationsModal";
import { MAX_CODE_LENGTH } from "@/shared/constants";
import { useTranslationsForm } from "@/shared/hooks";

interface AirportFormProps {
    isEditing: boolean;
    entityName: string;
    control: Control<AirportFormValues>;
    setValue: UseFormSetValue<AirportFormValues>;
}

export function AirportForm({ isEditing, control, setValue, entityName }: AirportFormProps) {
    const { t } = useTranslation("app");

    const { data: cities = [], isLoading: citiesLoading } = useAllCities();

    const cityOptions = cities.map((city) => ({
        value: city.id,
        label: `${city.code} — ${city.name}`,
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
                label={t("form.airportCode")}
                placeholder={t("form.enterAirportCode")}
                maxLength={MAX_CODE_LENGTH + 1}
                uppercase
            />

            <FormInput
                entityName={entityName}
                control={control}
                name="name"
                label={t("form.airportName")}
                placeholder={t("form.enterAirportName")}
            />

            <FormSelect
                entityName={entityName}
                control={control}
                name="cityId"
                label={t("form.city")}
                placeholder={t("form.selectCity")}
                options={cityOptions}
                loading={citiesLoading}
                allowClear
                showSearch
            />

            <FormNumberInput
                entityName={entityName}
                control={control}
                name="latitude"
                label={t("form.latitude")}
                placeholder={t("form.enterLatitude")}
            />

            <FormNumberInput
                entityName={entityName}
                control={control}
                name="longitude"
                label={t("form.longitude")}
                placeholder={t("form.enterLongitude")}
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
