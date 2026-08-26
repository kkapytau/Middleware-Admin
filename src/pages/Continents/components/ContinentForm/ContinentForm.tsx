import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "antd";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import {
    type ContinentFormValues,
    createContinentFormSchema,
    defaultContinentFormValues,
} from "@/entities/continent";
import { FormInput } from "@/shared/components/form";

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
        </Form>
    );
}
