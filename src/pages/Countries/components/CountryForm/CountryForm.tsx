import { zodResolver } from "@hookform/resolvers/zod";
import { Form, Input, Select } from "antd";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { useContinents } from "@/entities/continent";
import {
    type CountryFormValues,
    createCountryFormSchema,
    defaultCountryFormValues,
} from "@/entities/country";

interface CountryFormProps {
    defaultValues?: CountryFormValues;
    onSubmit: (values: CountryFormValues) => Promise<void>;
}

export function CountryForm({ defaultValues, onSubmit }: CountryFormProps) {
    const { t } = useTranslation("app");

    const { data: continents = [], isLoading: isContinentsLoading } = useContinents();

    const countryFormSchema = createCountryFormSchema({
        required: t("validation.required"),
        codePattern: t("validation.codeUppercaseLength"),
    });

    const { control, handleSubmit, reset } = useForm<CountryFormValues>({
        defaultValues: defaultValues ?? defaultCountryFormValues,
        resolver: zodResolver(countryFormSchema),
    });

    const handleFormFinish = () => {
        void handleSubmit(onSubmit)();
    };

    useEffect(() => {
        reset(defaultValues ?? defaultCountryFormValues);
    }, [defaultValues, reset]);

    return (
        <Form id="country-form" layout="vertical" onFinish={handleFormFinish}>
            <Controller
                name="code"
                control={control}
                render={({ field, fieldState }) => (
                    <Form.Item
                        label={t("form.code")}
                        validateStatus={fieldState.error ? "error" : undefined}
                        help={fieldState.error?.message}
                    >
                        <Input {...field} maxLength={2} placeholder={t("form.enterCode")} />
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
                        <Input {...field} maxLength={100} placeholder={t("form.enterName")} />
                    </Form.Item>
                )}
            />

            <Controller
                name="continentId"
                control={control}
                render={({ field, fieldState }) => (
                    <Form.Item
                        label={t("form.continent")}
                        validateStatus={fieldState.error ? "error" : undefined}
                        help={fieldState.error?.message}
                    >
                        <Select
                            {...field}
                            value={field.value || undefined}
                            placeholder={t("form.selectContinent")}
                            loading={isContinentsLoading}
                            options={continents.map((continent) => ({
                                value: continent.id,
                                label: `${continent.code} - ${continent.name}`,
                            }))}
                            onChange={field.onChange}
                        />
                    </Form.Item>
                )}
            />
        </Form>
    );
}
