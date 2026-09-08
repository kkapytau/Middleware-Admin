import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "antd";
import { useTranslation } from "react-i18next";

import {
    createLocaleFormSchema,
    defaultLocaleFormValues,
    type LocaleFormValues,
} from "@/entities/locale";
import { FormCheckbox, FormInput } from "@/shared/components/form";
import { MAX_CODE_LENGTH } from "@/shared/constants";
import { useEntityForm } from "@/shared/hooks";

interface LocaleFormProps {
    isEditing: boolean;
    defaultValues?: LocaleFormValues;
    onSubmit: (values: LocaleFormValues) => Promise<void>;
}

export function LocaleForm({ isEditing, defaultValues, onSubmit }: LocaleFormProps) {
    const { t } = useTranslation("app");

    const localeFormSchema = createLocaleFormSchema({
        required: t("validation.required"),
        codePattern: t("validation.codeUppercaseLength"),
    });

    const handleFormFinish = () => {
        void handleSubmit(onSubmit)();
    };

    const { control, handleSubmit } = useEntityForm<LocaleFormValues>({
        defaultValues: defaultLocaleFormValues,
        initialValues: defaultValues,
        resolver: zodResolver(localeFormSchema),
    });

    return (
        <Form id="locale-form" layout="vertical" onFinish={handleFormFinish}>
            <FormInput
                control={control}
                name="code"
                label={t("form.code")}
                placeholder={t("form.enterCode")}
                maxLength={MAX_CODE_LENGTH}
                uppercase
                disabled={isEditing}
            />

            <FormInput
                control={control}
                name="name"
                label={t("form.name")}
                placeholder={t("form.enterName")}
            />

            {isEditing && (
                <FormCheckbox control={control} name="deleted">
                    {t("form.deleted")}
                </FormCheckbox>
            )}
        </Form>
    );
}
