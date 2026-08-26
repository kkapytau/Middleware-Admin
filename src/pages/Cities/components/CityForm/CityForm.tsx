import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "antd";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { type CityFormValues, createCityFormSchema, defaultCityFormValues } from "@/entities/city";
import { useAllCountries } from "@/entities/country";
import { FormInput, FormSelect } from "@/shared/components/form";

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

    const { control, handleSubmit, reset } = useForm<CityFormValues>({
        defaultValues: defaultValues ?? defaultCityFormValues,
        resolver: zodResolver(cityFormSchema),
    });

    const countryOptions = countries.map((country) => ({
        value: country.id,
        label: `${country.code} — ${country.name}`,
    }));

    const handleFormFinish = () => {
        void handleSubmit(onSubmit)();
    };

    useEffect(() => {
        reset(defaultValues ?? defaultCityFormValues);
    }, [defaultValues, reset]);

    return (
        <Form id="city-form" layout="vertical" onFinish={handleFormFinish}>
            <FormInput
                control={control}
                name="code"
                label={t("form.code")}
                placeholder={t("form.enterCode")}
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
        </Form>
    );
}
