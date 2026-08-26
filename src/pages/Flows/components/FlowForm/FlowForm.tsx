import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "antd";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { createFlowFormSchema, defaultFlowFormValues, type FlowFormValues } from "@/entities/flow";
import { FormInput } from "@/shared/components/form";

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
        flowCodePattern: t("validation.flowCodePattern"),
    });

    const { control, handleSubmit, reset } = useForm<FlowFormValues>({
        defaultValues: defaultValues ?? defaultFlowFormValues,
        resolver: zodResolver(flowFormSchema),
    });

    const handleFormFinish = () => {
        void handleSubmit(onSubmit)();
    };

    useEffect(() => {
        reset(defaultValues ?? defaultFlowFormValues);
    }, [defaultValues, reset]);

    return (
        <Form id="flow-form" layout="vertical" onFinish={handleFormFinish} className={styles.form}>
            <FormInput
                control={control}
                name="code"
                label={t("form.flowCode")}
                placeholder={t("form.flowCodePlaceholder")}
            />

            <FormInput
                control={control}
                name="name"
                label={t("form.flowName")}
                placeholder={t("form.flowNamePlaceholder")}
            />
        </Form>
    );
}
