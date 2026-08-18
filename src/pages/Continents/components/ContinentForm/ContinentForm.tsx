import { zodResolver } from "@hookform/resolvers/zod";
import { Form, Input } from "antd";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import {
    type ContinentFormValues,
    createContinentFormSchema,
    defaultContinentFormValues,
} from "@/entities/continent";

interface ContinentFormProps {
    defaultValues?: ContinentFormValues;
    onSubmit: (values: ContinentFormValues) => Promise<void>;
}

export function ContinentForm({ defaultValues, onSubmit }: ContinentFormProps) {
    const { t } = useTranslation("app");

    const continentFormSchema = createContinentFormSchema({
        required: t("validation.required"),
        codePattern: t("validation.codeUppercaseLength"),
    });

    const { control, handleSubmit, reset } = useForm<ContinentFormValues>({
        defaultValues: defaultValues ?? defaultContinentFormValues,
        resolver: zodResolver(continentFormSchema),
    });

    const handleFormFinish = () => {
        void handleSubmit(onSubmit)();
    };

    useEffect(() => {
        reset(defaultValues ?? defaultContinentFormValues);
    }, [defaultValues, reset]);

    return (
        <Form id="continent-form" layout="vertical" onFinish={handleFormFinish}>
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
                        <Input {...field} maxLength={50} placeholder={t("form.enterName")} />
                    </Form.Item>
                )}
            />
        </Form>
    );
}
