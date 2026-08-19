import { zodResolver } from "@hookform/resolvers/zod";
import { Form, Input, Select } from "antd";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { type CityFormValues, createCityFormSchema, defaultCityFormValues } from "@/entities/city";
import { useCountries } from "@/entities/country";

interface CityFormProps {
    defaultValues?: CityFormValues;
    onSubmit: (values: CityFormValues) => Promise<void>;
}

export function CityForm({ defaultValues, onSubmit }: CityFormProps) {
    const { t } = useTranslation("app");

    const { data: countries = [], isLoading: isLoadingCountries } = useCountries();

    const cityFormSchema = createCityFormSchema({
        required: t("validation.required"),
        cityCodeLength: t("validation.cityCodeLength"),
        cityCodePattern: t("validation.cityCodePattern"),
    });

    const { control, handleSubmit, reset } = useForm<CityFormValues>({
        defaultValues: defaultValues ?? defaultCityFormValues,
        resolver: zodResolver(cityFormSchema),
    });

    const handleFormFinish = () => {
        void handleSubmit(onSubmit)();
    };

    useEffect(() => {
        reset(defaultValues ?? defaultCityFormValues);
    }, [defaultValues, reset]);

    return (
        <Form id="city-form" layout="vertical" onFinish={handleFormFinish}>
            <Controller
                name="code"
                control={control}
                render={({ field, fieldState }) => (
                    <Form.Item
                        label={t("form.code")}
                        validateStatus={fieldState.error ? "error" : undefined}
                        help={fieldState.error?.message}
                    >
                        <Input {...field} placeholder={t("form.enterCode")} maxLength={3} />
                    </Form.Item>
                )}
            />

            <Controller
                name="name"
                control={control}
                render={({ field, fieldState }) => (
                    <Form.Item
                        label={t("form.name")}
                        validateStatus={fieldState.error ? "error" : undefined}
                        help={fieldState.error?.message}
                    >
                        <Input {...field} placeholder={t("form.enterName")} />
                    </Form.Item>
                )}
            />

            <Controller
                name="countryId"
                control={control}
                render={({ field, fieldState }) => (
                    <Form.Item
                        label={t("form.country")}
                        validateStatus={fieldState.error ? "error" : undefined}
                        help={fieldState.error?.message}
                    >
                        <Select
                            {...field}
                            value={field.value || undefined}
                            loading={isLoadingCountries}
                            placeholder={t("form.selectCountry")}
                            options={countries.map((country) => ({
                                value: country.id,
                                label: `${country.code} — ${country.name}`,
                            }))}
                        />
                    </Form.Item>
                )}
            />
        </Form>
    );
}
