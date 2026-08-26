import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "antd";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { useContinents } from "@/entities/continent";
import {
    type CountryFormValues,
    createCountryFormSchema,
    defaultCountryFormValues,
} from "@/entities/country";
import { FormInput, FormSelect } from "@/shared/components/form";

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

    const continentsOptions = continents.map((continent) => ({
        value: continent.id,
        label: `${continent.code} - ${continent.name}`,
    }));

    const handleFormFinish = () => {
        void handleSubmit(onSubmit)();
    };

    useEffect(() => {
        reset(defaultValues ?? defaultCountryFormValues);
    }, [defaultValues, reset]);

    return (
        <Form id="country-form" layout="vertical" onFinish={handleFormFinish}>
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
                name="continentId"
                label={t("form.continent")}
                placeholder={t("form.selectContinent")}
                options={continentsOptions}
                loading={isContinentsLoading}
                allowClear
                showSearch
            />
        </Form>
    );
}
