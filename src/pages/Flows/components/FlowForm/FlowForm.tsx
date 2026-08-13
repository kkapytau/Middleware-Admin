import { zodResolver } from "@hookform/resolvers/zod";
import { Form, Input } from "antd";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { createFlowFormSchema, defaultFlowFormValues, type FlowFormValues } from "@/entities/flow";

import styles from "./FlowForm.module.scss";

interface FlowFormProps {
    defaultValues?: FlowFormValues;
    onSubmit: (values: FlowFormValues) => Promise<void>;
}

export function FlowForm({ defaultValues, onSubmit }: FlowFormProps) {
    const { t } = useTranslation("app");

    const flowFormSchema = createFlowFormSchema({
        required: t("validation.required"),
        flowCodeMinLength: t("validation.flowCodeMinLength"),
        flowCodeMaxLength: t("validation.flowCodeMaxLength"),
        flowNameMaxLength: t("validation.flowNameMaxLength"),
    });

    const { control, handleSubmit, reset } = useForm<FlowFormValues>({
        defaultValues: defaultValues ?? defaultFlowFormValues,
        resolver: zodResolver(flowFormSchema),
    });

    useEffect(() => {
        reset(defaultValues ?? defaultFlowFormValues);
    }, [defaultValues, reset]);

    return (
        <Form
            id="flow-form"
            layout="vertical"
            onFinish={() => {
                handleSubmit(onSubmit);
            }}
            className={styles.form}
        >
            <Controller
                name="code"
                control={control}
                render={({ field, fieldState }) => (
                    <Form.Item
                        label={t("form.flowCode")}
                        validateStatus={fieldState.error ? "error" : undefined}
                        help={fieldState.error?.message}
                    >
                        <Input {...field} placeholder={t("form.flowCodePlaceholder")} />
                    </Form.Item>
                )}
            />

            <Controller
                name="name"
                control={control}
                render={({ field, fieldState }) => (
                    <Form.Item
                        label={t("form.flowName")}
                        validateStatus={fieldState.error ? "error" : undefined}
                        help={fieldState.error?.message}
                    >
                        <Input {...field} placeholder={t("form.flowNamePlaceholder")} />
                    </Form.Item>
                )}
            />
        </Form>
    );
}
