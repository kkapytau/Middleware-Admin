import { Button, Flex } from "antd";
import type { Control, UseFormSetValue } from "react-hook-form";
import { useTranslation } from "react-i18next";

import type { AirportFormValues } from "@/entities/airport";
import { useAllCities } from "@/entities/city";
import { FormCheckbox, FormInput, FormNumberInput, FormSelect } from "@/shared/components/form";
import { TranslationsModal } from "@/shared/components/TranslationsModal";
import { MAX_CODE_LENGTH } from "@/shared/constants";
import { useTranslationsForm } from "@/shared/hooks";

interface AirportFormProps {
    isEditing: boolean;
    control: Control<AirportFormValues>;
    setValue: UseFormSetValue<AirportFormValues>;
}

export function AirportForm({ isEditing, control, setValue }: AirportFormProps) {
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
                control={control}
                name="code"
                label={t("form.airportCode")}
                placeholder={t("form.enterAirportCode")}
                maxLength={MAX_CODE_LENGTH + 1}
                uppercase
            />

            <FormInput
                control={control}
                name="name"
                label={t("form.airportName")}
                placeholder={t("form.enterAirportName")}
            />

            <FormSelect
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
                control={control}
                name="latitude"
                label={t("form.latitude")}
                placeholder={t("form.enterLatitude")}
            />

            <FormNumberInput
                control={control}
                name="longitude"
                label={t("form.longitude")}
                placeholder={t("form.enterLongitude")}
            />

            {isEditing && (
                <FormCheckbox control={control} name="deleted">
                    {t("form.deleted")}
                </FormCheckbox>
            )}

            <Flex justify="flex-start">
                <Button type="default" onClick={() => setTranslationsOpen(true)}>
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
