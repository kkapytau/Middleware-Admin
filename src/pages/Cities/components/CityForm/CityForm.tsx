import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Flex, Form } from "antd";
import { useTranslation } from "react-i18next";

import { type CityFormValues, createCityFormSchema, defaultCityFormValues } from "@/entities/city";
import { useAllCountries } from "@/entities/country";
import { FormInput, FormSelect } from "@/shared/components/form";
import { TranslationsModal } from "@/shared/components/TranslationsModal";
import { MAX_CODE_LENGTH } from "@/shared/constants";
import { useEntityForm, useTranslationsForm } from "@/shared/hooks";

interface CityFormProps {
    defaultValues?: CityFormValues;
    onSubmit: (values: CityFormValues) => Promise<void>;
}

export function CityForm({ defaultValues, onSubmit }: CityFormProps) {
    const { t } = useTranslation("app");

    const { data: countries = [], isLoading: isLoadingCountries } = useAllCountries();

    const cityFormSchema = createCityFormSchema({
        required: t("validation.required"),
        cityCodeLength: t("validation.cityCodeLength"),
        cityCodePattern: t("validation.cityCodePattern"),
    });

    const countryOptions = countries.map((country) => ({
        value: country.id,
        label: `${country.code} — ${country.name}`,
    }));

    const handleFormFinish = () => {
        void handleSubmit(onSubmit)();
    };

    const { control, handleSubmit, setValue } = useEntityForm<CityFormValues>({
        defaultValues: defaultCityFormValues,
        initialValues: defaultValues,
        resolver: zodResolver(cityFormSchema),
    });

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
            <Form id="city-form" layout="vertical" onFinish={handleFormFinish}>
                <FormInput
                    control={control}
                    name="code"
                    label={t("form.code")}
                    placeholder={t("form.enterCode")}
                    maxLength={MAX_CODE_LENGTH + 1}
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
                    name="countryId"
                    label={t("form.country")}
                    placeholder={t("form.selectCountry")}
                    options={countryOptions}
                    loading={isLoadingCountries}
                    allowClear
                    showSearch
                />

                <Flex justify="flex-start">
                    <Button type="default" onClick={() => setTranslationsOpen(true)}>
                        🌐 {t("translations.manage")}
                    </Button>
                </Flex>
            </Form>

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
