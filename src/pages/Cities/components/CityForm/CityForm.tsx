import type { Control, UseFormSetValue } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { useAllAreas } from "@/entities/area";
import { type CityFormValues } from "@/entities/city";
import { useAllCountries } from "@/entities/country";
import { useAllTimezones } from "@/entities/timezone";
import { FormInput, FormSelect } from "@/shared/components/form";
import { TranslationsButton } from "@/shared/components/form/TranslationsButton";
import { TranslationsModal } from "@/shared/components/TranslationsModal";
import { MAX_CODE_LENGTH } from "@/shared/constants";
import { useTranslationsForm } from "@/shared/hooks";

interface CityFormProps {
    entityName: string;
    control: Control<CityFormValues>;
    setValue: UseFormSetValue<CityFormValues>;
}

export function CityForm({ control, setValue, entityName }: CityFormProps) {
    const { t } = useTranslation("app");

    const { data: countries = [], isLoading: isLoadingCountries } = useAllCountries({
        isCountry: true,
    });

    const { data: timezones = [], isLoading: isLoadingTimezones } = useAllTimezones({
        disabled: false,
    });

    const { data: areas = [], isLoading: isLoadingAreas } = useAllAreas({
        disabled: false,
    });

    const countryOptions = countries.map((country) => ({
        value: country.id,
        label: `${country.code} — ${country.name}`,
    }));

    const timezoneOptions = timezones.map((timezone) => ({
        value: timezone.id,
        label: `${timezone.code} (${timezone.utcOffset})`,
    }));

    const areaOptions = areas.map((area) => ({
        value: area.id,
        label: `${area.code} — ${area.name}`,
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
                maxLength={MAX_CODE_LENGTH + 1}
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
                name="countryId"
                label={t("form.country")}
                placeholder={t("form.selectCountry")}
                options={countryOptions}
                loading={isLoadingCountries}
                allowClear
                showSearch
            />

            <FormSelect
                entityName={entityName}
                control={control}
                name="areaId"
                label={t("form.area")}
                placeholder={t("form.selectArea")}
                options={areaOptions}
                loading={isLoadingAreas}
                allowClear
                showSearch
            />

            <FormSelect
                entityName={entityName}
                control={control}
                name="timeZoneId"
                label={t("form.timezone")}
                placeholder={t("form.selectTimezone")}
                options={timezoneOptions}
                loading={isLoadingTimezones}
                allowClear
                showSearch
            />

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
